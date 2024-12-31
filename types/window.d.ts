declare global {
  interface Window {
    chrome: {
      webview: {
        postMessage(message: { channel: string; args: any[] }): void;
      };
    };
  }
}

export {};
