# Transparent Top Bar

A GNOME Shell extension that makes the top panel transparent with smart transparency, compact mode, and customizable settings.

Forked from [esorio/transparent-topbar](https://github.com/esorio/transparent-topbar), merged with features from [metehan-arslan/gnome-compact-top-bar](https://github.com/metehan-arslan/gnome-compact-top-bar).

## Features

- **Smart transparency** — Top bar becomes transparent when no window is near it, solid when a window is close
- **Simple transparency** — Always transparent mode (classic behavior)
- **Compact mode** — Reduce top bar height for more screen space
- **Fade text on fullscreen** — Fade top bar text color when an application is fullscreen
- **Adjustable transparency level** — Customize the transparency intensity
- **Settings panel** — All options configurable via GNOME Extensions preferences

## Compatibility

| GNOME Shell Version | Status |
|---------------------|--------|
| 45 - 49             | ✅ Supported |
| 3.36 - 44           | Use [original repo](https://github.com/esorio/transparent-topbar) |

## Installation

### From source

```bash
git clone https://github.com/iamcheyan/transparent-topbar.git
cd transparent-topbar
cp -r TransparentTopbar@enrico.sorio.net ~/.local/share/gnome-shell/extensions/
```

Then restart GNOME Shell (X11: `Alt+F2` → `r`) or log out and back in (Wayland).

### Enable the extension

```bash
gnome-extensions enable TransparentTopbar@enrico.sorio.net
```

### Open settings

```bash
gnome-extensions prefs TransparentTopbar@enrico.sorio.net
```

## Settings

| Setting | Description |
|---------|-------------|
| Smart transparency | Automatically switch between transparent and solid based on window position |
| Transparency level | Background transparency when no window is near (0 = fully transparent, 1 = opaque) |
| Compact mode | Reduce top bar height for more screen space |
| Fade text on fullscreen | Fade top bar text color when an application is fullscreen |

## Credits

- Original extension by [Enrico Sorio](https://github.com/esorio/transparent-topbar)
- Compact Top Bar features by [Metehan Arslan](https://github.com/metehan-arslan/gnome-compact-top-bar)
- GNOME 45+ ESM migration and merge by [iamcheyan](https://github.com/iamcheyan)

## License

GPL-3.0
