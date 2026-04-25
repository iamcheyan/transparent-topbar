# Transparent Topbar

A GNOME Shell extension that makes the top panel transparent.

## Features

- Transparent top panel background
- Multi-monitor support
- Persists across workspace switches

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

## Credits

- Original extension by [Enrico Sorio](https://github.com/esorio/transparent-topbar)
- GNOME 45+ ESM migration by [iamcheyan](https://github.com/iamcheyan)

## License

GPL-3.0
