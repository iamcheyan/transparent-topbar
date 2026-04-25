'use strict';

import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class TransparentTopbarPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        const settings = this.getSettings();

        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup({
            title: _('Transparent Top Bar Settings'),
        });
        page.add(group);

        // Smart transparency toggle
        const smartRow = new Adw.ActionRow({
            title: _('Smart transparency'),
            subtitle: _('Automatically switch between transparent and solid based on window position')
        });
        const smartToggle = new Gtk.Switch({
            active: settings.get_boolean('transparent-mode'),
            valign: Gtk.Align.CENTER,
        });
        settings.bind('transparent-mode', smartToggle, 'active', Gio.SettingsBindFlags.DEFAULT);
        smartRow.add_suffix(smartToggle);
        smartRow.activatable_widget = smartToggle;
        group.add(smartRow);

        // Transparency level slider
        const levelRow = new Adw.ActionRow({
            title: _('Transparency level'),
            subtitle: _('Background transparency when no window is near (0 = fully transparent, 1 = opaque)')
        });
        const levelAdjustment = new Gtk.Adjustment({
            lower: 0,
            upper: 1,
            step_increment: 0.05,
        });
        const levelScale = new Gtk.Scale({
            adjustment: levelAdjustment,
            digits: 2,
            valign: Gtk.Align.CENTER,
            width_request: 200,
        });
        settings.bind('transparency-level', levelAdjustment, 'value', Gio.SettingsBindFlags.DEFAULT);
        levelRow.add_suffix(levelScale);
        group.add(levelRow);

        // Compact mode toggle
        const compactRow = new Adw.ActionRow({
            title: _('Compact mode'),
            subtitle: _('Reduce top bar height for more screen space')
        });
        const compactToggle = new Gtk.Switch({
            active: settings.get_boolean('compact-mode'),
            valign: Gtk.Align.CENTER,
        });
        settings.bind('compact-mode', compactToggle, 'active', Gio.SettingsBindFlags.DEFAULT);
        compactRow.add_suffix(compactToggle);
        compactRow.activatable_widget = compactToggle;
        group.add(compactRow);

        // Fade text on fullscreen toggle
        const fadeRow = new Adw.ActionRow({
            title: _('Fade text on fullscreen'),
            subtitle: _('Fade top bar text color when an application is fullscreen')
        });
        const fadeToggle = new Gtk.Switch({
            active: settings.get_boolean('fade-text-on-fullscreen'),
            valign: Gtk.Align.CENTER,
        });
        settings.bind('fade-text-on-fullscreen', fadeToggle, 'active', Gio.SettingsBindFlags.DEFAULT);
        fadeRow.add_suffix(fadeToggle);
        fadeRow.activatable_widget = fadeToggle;
        group.add(fadeRow);

        window.add(page);
    }
}
