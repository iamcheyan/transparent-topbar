/* exported init */

import Meta from 'gi://Meta';
import St from 'gi://St';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class TransparentTopbarExtension extends Extension {
    enable() {
        this._settings = this.getSettings();
        this._settingsChangedId = this._settings.connect('changed', this._onSettingsChanged.bind(this));

        this._actorSignalIds = new Map();
        this._windowSignalIds = new Map();

        // Overview signals
        this._actorSignalIds.set(Main.overview, [
            Main.overview.connect('showing', this._updateTransparent.bind(this)),
            Main.overview.connect('hiding', this._updateTransparent.bind(this))
        ]);

        // Session mode signal
        this._actorSignalIds.set(Main.sessionMode, [
            Main.sessionMode.connect('updated', this._updateTransparent.bind(this))
        ]);

        // Window signals
        for (const metaWindowActor of global.get_window_actors()) {
            this._onWindowActorAdded(metaWindowActor.get_parent(), metaWindowActor);
        }

        this._actorSignalIds.set(global.window_group, [
            global.window_group.connect('child-added', this._onWindowActorAdded.bind(this)),
            global.window_group.connect('child-removed', this._onWindowActorRemoved.bind(this))
        ]);

        this._actorSignalIds.set(global.window_manager, [
            global.window_manager.connect('switch-workspace', this._updateTransparent.bind(this))
        ]);

        this._updateStyles();
        this._updateTransparent();
    }

    disable() {
        if (this._settingsChangedId) {
            this._settings.disconnect(this._settingsChangedId);
            this._settingsChangedId = null;
        }

        for (const actorSignalIds of [this._actorSignalIds, this._windowSignalIds]) {
            for (const [actor, signalIds] of actorSignalIds) {
                for (const signalId of signalIds) {
                    actor.disconnect(signalId);
                }
            }
        }
        this._actorSignalIds = null;
        this._windowSignalIds = null;
        this._settings = null;

        Main.panel.remove_style_class_name('transparent-top-bar--solid');
        Main.panel.remove_style_class_name('transparent-top-bar--transparent');
        Main.panel.remove_style_class_name('transparent-top-bar--fade-text');
        Main.panel.remove_style_class_name('transparent-top-bar--compact');
    }

    _onSettingsChanged() {
        this._updateStyles();
        this._updateTransparent();
    }

    _onWindowActorAdded(container, metaWindowActor) {
        this._windowSignalIds.set(metaWindowActor, [
            metaWindowActor.connect('notify::allocation', this._updateTransparent.bind(this)),
            metaWindowActor.connect('notify::visible', this._updateTransparent.bind(this))
        ]);
    }

    _onWindowActorRemoved(container, metaWindowActor) {
        const signalIds = this._windowSignalIds.get(metaWindowActor);
        if (signalIds) {
            for (const signalId of signalIds) {
                metaWindowActor.disconnect(signalId);
            }
            this._windowSignalIds.delete(metaWindowActor);
        }
        this._updateTransparent();
    }

    _updateStyles() {
        const fadeText = this._settings.get_boolean('fade-text-on-fullscreen');
        const compactMode = this._settings.get_boolean('compact-mode');

        if (fadeText) {
            Main.panel.add_style_class_name('transparent-top-bar--fade-text');
        } else {
            Main.panel.remove_style_class_name('transparent-top-bar--fade-text');
        }

        if (compactMode) {
            Main.panel.add_style_class_name('transparent-top-bar--compact');
        } else {
            Main.panel.remove_style_class_name('transparent-top-bar--compact');
        }
    }

    _updateTransparent() {
        const smartMode = this._settings.get_boolean('transparent-mode');

        if (!smartMode) {
            // Simple mode: always transparent
            this._setTransparent(true);
            return;
        }

        // Smart mode: check if window is near panel
        if (Main.panel.has_style_pseudo_class('overview') || !Main.sessionMode.hasWindows) {
            this._setTransparent(true);
            return;
        }

        if (!Main.layoutManager.primaryMonitor) {
            return;
        }

        const workspaceManager = global.workspace_manager;
        const activeWorkspace = workspaceManager.get_active_workspace();
        const topBarMonitor = Main.layoutManager.findMonitorForActor(Main.panel).index;
        const windows = activeWorkspace.list_windows().filter(metaWindow => {
            return metaWindow.get_monitor() === topBarMonitor
                && metaWindow.showing_on_its_workspace()
                && !metaWindow.is_hidden()
                && !metaWindow.is_fullscreen()
                && metaWindow.get_window_type() !== Meta.WindowType.DESKTOP;
        });

        const panelTop = Main.panel.get_transformed_position()[1];
        const panelBottom = panelTop + Main.panel.get_height();
        const scale = St.ThemeContext.get_for_stage(global.stage).scale_factor;
        const isNearEnough = windows.some(metaWindow => {
            const verticalPosition = metaWindow.get_frame_rect().y;
            return verticalPosition < panelBottom + 5 * scale;
        });

        this._setTransparent(!isNearEnough);
    }

    _setTransparent(transparent) {
        if (transparent) {
            Main.panel.remove_style_class_name('transparent-top-bar--solid');
            Main.panel.add_style_class_name('transparent-top-bar--transparent');
        } else {
            Main.panel.add_style_class_name('transparent-top-bar--solid');
            Main.panel.remove_style_class_name('transparent-top-bar--transparent');
        }
    }
}
