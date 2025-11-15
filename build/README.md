# Build Resources

This directory contains resources needed for building and packaging your Electron application.

## Required Icons

To package your application, you need to provide icons for each platform:

### macOS

- **File**: `icon.icns`
- **Size**: 512x512px or 1024x1024px
- **Format**: ICNS (Apple Icon Image)

### Windows

- **File**: `icon.ico`
- **Sizes**: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
- **Format**: ICO (Windows Icon)

### Linux

- **Directory**: `icons/`
- **Files**: PNG images in various sizes
  - `16x16.png`
  - `32x32.png`
  - `48x48.png`
  - `64x64.png`
  - `128x128.png`
  - `256x256.png`
  - `512x512.png`

## Icon Generation Tools

You can use these tools to generate icons from a single source image:

### Electron Icon Maker

```bash
npm install -g electron-icon-maker
electron-icon-maker --input=/path/to/icon.png --output=./build
```

### electron-icon-builder

```bash
npm install -g electron-icon-builder
electron-icon-builder --input=/path/to/icon.png --output=./build
```

## Design Guidelines

### Best Practices

- Start with a high-resolution source image (at least 1024x1024px)
- Use PNG format with transparency for the source
- Keep the design simple and recognizable at small sizes
- Test how the icon looks at 16x16px (smallest size)
- Use a square canvas with your icon centered
- Avoid fine details that won't be visible at small sizes

### Platform-Specific Considerations

**macOS**

- Use rounded corners (macOS will apply its own rounded square mask)
- Consider the visual weight - macOS icons tend to be colorful
- Test in both light and dark mode

**Windows**

- Windows icons are typically more literal/realistic
- Ensure good contrast for taskbar visibility
- Test against both light and dark taskbars

**Linux**

- Various desktop environments may render differently
- Ensure the icon works well with different themes
- Keep sufficient padding around the edges

## Quick Start

If you want to test packaging without custom icons, you can use the default Electron icon temporarily. However, for production releases, you should always provide custom icons that represent your application.

For testing purposes, you can temporarily comment out the icon references in `package.json`:

```json
{
  "build": {
    "mac": {
      // "icon": "build/icon.icns"
    },
    "win": {
      // "icon": "build/icon.ico"
    },
    "linux": {
      // "icon": "build/icons"
    }
  }
}
```

## File Structure

```
build/
├── README.md          # This file
├── icon.icns          # macOS icon (add this)
├── icon.ico           # Windows icon (add this)
└── icons/             # Linux icons directory
    ├── 16x16.png      # Add these
    ├── 32x32.png
    ├── 48x48.png
    ├── 64x64.png
    ├── 128x128.png
    ├── 256x256.png
    └── 512x512.png
```
