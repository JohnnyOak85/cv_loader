import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  runProgram: () => ipcRenderer.invoke("run-program"),
  quit: () => ipcRenderer.invoke("quit"),
});
