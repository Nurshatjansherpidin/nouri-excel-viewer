# Nouri's Excel Viewer

Nouri's Excel Viewer is a premium, high-performance, and offline-capable Excel spreadsheet viewer for VS Code / Antigravity IDE. It lets you view `.xlsx` and `.xls` files directly in your IDE with rich, theme-adaptive styling.

## Features

* 🎨 **Theme Adaptive**: Instantly blends with your editor's Dark, Light, or High Contrast themes using IDE variables.
* 📑 **Multi-Sheet Tabs**: Seamlessly switch between different worksheets in your Excel file.
* ⇅ **Interactive Sorting**: Click any column header to sort rows dynamically (numbers and strings supported).
* 🔍 **Global Searching & Filtering**: Search and filter rows in real-time as you type.
* 🌐 **100% Offline**: Includes SheetJS locally to run completely offline without remote network dependencies.

## Usage

1. Open any `.xlsx` or `.xls` file in your editor.
2. If it opens in binary view, right-click the file in the sidebar and select **Open With...** -> **Nouri's Excel Viewer**.

---

## Publishing to GitHub

To publish this extension to your GitHub:

1. Create a new repository on GitHub named `nouri-excel-viewer`.
2. Open your terminal in the extension folder and run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/nouri-excel-viewer.git
   git branch -M main
   git push -u origin main
   ```

---

## Packaging into a `.vsix` Installer

You can compile this extension into a standard VS Code / IDE extension package (`.vsix`) so others can install it:

1. Make sure Node.js is installed.
2. In the terminal inside this folder, run:
   ```bash
   npx @vscode/vsce package
   ```
3. This creates a file named `nouri-excel-viewer-1.0.0.vsix` in this directory.
4. Anyone can install it by dragging the file into the IDE, or selecting **Extensions** -> **...** -> **Install from VSIX...**.

---

## Publishing to Open VSX

To publish this extension to the Open VSX Registry:

1. Go to [Open VSX](https://open-vsx.org) and sign in (e.g. via GitHub).
2. Go to **Settings** -> **Namespaces** and register a namespace matching the publisher name in `package.json` (i.e. `nouri`).
3. Generate an **Access Token** from your settings.
4. Publish the package using the CLI:
   ```bash
   npx ovsx publish nouri-excel-viewer-1.0.0.vsix -t YOUR_ACCESS_TOKEN
   ```
