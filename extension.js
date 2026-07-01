const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

class ExcelEditorProvider {
  static register(context) {
    const provider = new ExcelEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(ExcelEditorProvider.viewType, provider);
    return providerRegistration;
  }

  constructor(context) {
    this.context = context;
  }

  /**
   * Opens the custom document.
   */
  async openCustomDocument(uri, openContext, token) {
    return {
      uri,
      dispose: () => {}
    };
  }

  /**
   * Resolves the custom editor by rendering the webview and sending the binary file contents.
   */
  async resolveCustomEditor(document, webviewPanel, token) {
    // Enable scripts and restrict resource roots to the extension folder
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(this.context.extensionPath)
      ]
    };

    // Load webview.html template
    const htmlPath = path.join(this.context.extensionPath, 'webview.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Convert local SheetJS script path to a webview URI
    const xlsxPath = vscode.Uri.file(path.join(this.context.extensionPath, 'xlsx.full.min.js'));
    const xlsxWebviewUri = webviewPanel.webview.asWebviewUri(xlsxPath);

    // Replace script src in HTML with the correct webview URI
    htmlContent = htmlContent.replace('src="xlsx.full.min.js"', `src="${xlsxWebviewUri}"`);

    // Set HTML content
    webviewPanel.webview.html = htmlContent;

    // Function to read and post the file data
    const postFileData = async () => {
      try {
        const fileData = await vscode.workspace.fs.readFile(document.uri);
        const base64Content = Buffer.from(fileData).toString('base64');
        
        webviewPanel.webview.postMessage({
          type: 'load',
          content: base64Content,
          filename: path.basename(document.uri.fsPath)
        });
      } catch (err) {
        vscode.window.showErrorMessage(`Failed to parse Excel file: ${err.message}`);
      }
    };

    // Post the file content immediately. Webviews queue incoming messages while loading.
    await postFileData();
  }
}
ExcelEditorProvider.viewType = 'nouriExcelViewer.excelViewer';

function activate(context) {
  context.subscriptions.push(ExcelEditorProvider.register(context));
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
