/* exported init */

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class TransparentTopbarExtension extends Extension {
    enable() {
        this._setStyle();
        global.window_manager.connectObject('switch-workspace',
            () => this._setStyle(), this);
    }

    disable() {
        global.window_manager.disconnectObject(this);
    }

    _setStyle() {
        Main.panel.remove_style_class_name('solid');
        Main.panel.add_style_class_name('panel-transparency');

        if (Main.mmPanel) {
            for (let i = 0, len = Main.mmPanel.length; i < len; i++) {
                Main.mmPanel[i].remove_style_class_name('solid');
                Main.mmPanel[i].add_style_class_name('panel-transparency');
            }
        }
    }
}
