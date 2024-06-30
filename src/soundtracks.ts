import { existsSync, mkdirSync } from "fs";
import { localStorage } from "electron-browser-storage";
import { applyConfig } from "./configs";
import decompress from "./compression";
import applyPatch from "./patches";

const applySoundtrack = async (
  basePath: string,
  packFolder: string,
  romPath: string
) => {
  try {
    const selected = await localStorage.getItem("soundtracks");
    const folderPath = `${basePath}/Soundtracks`;
    const pack = `${folderPath}/${selected}.zip`;

    if (!existsSync(folderPath)) {
      mkdirSync(folderPath);
    }

    if (!existsSync(pack)) {
      return;
    }

    decompress(pack, packFolder);
    await applyPatch(basePath, "Patches", "akuogg", romPath);
    applyConfig(basePath, packFolder, "sound");
  } catch (error) {
    throw error;
  }
};

export default applySoundtrack;
