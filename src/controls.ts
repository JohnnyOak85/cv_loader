import { localStorage } from "electron-browser-storage";
import applyPatch from "./patches";

const applyControls = async (basePath: string, romPath: string) => {
  const selected = await localStorage.getItem("controls");

  await applyPatch(basePath, "Controls", selected, romPath);
};

export default applyControls;
