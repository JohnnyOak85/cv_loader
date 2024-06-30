import { app, BrowserWindow, dialog, ipcMain } from "electron";
import path from "path";
import { setup } from "./setup";
import { play } from "./play";

const createWindow = () => {
  const window = new BrowserWindow({
    width: 900,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  window.loadFile("index.html");
};

app.on("ready", async () => {
  try {
    await setup(app.getAppPath());
  } catch (error) {
    const { message } = error as Error;

    dialog.showErrorBox("Error", message);
  }

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("run-program", async () => {
  try {
    await play(app.getAppPath());
  } catch (error) {
    const { message } = error as Error;

    dialog.showErrorBox("Error", message);
  }
});

ipcMain.handle("quit", () => {
  app.quit();
});
