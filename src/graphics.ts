import { existsSync, mkdirSync } from "fs";
import { localStorage } from "electron-browser-storage";
import { readConfig, writeConfig } from "./configs";
import decompress from "./compression";
import applyPatch from "./patches";

const applyGraphics = async (
  basePath: string,
  packFolder: string,
  romPath: string
) => {
  const selected = await localStorage.getItem("graphics");
  const folderPath = `${basePath}/Graphics`;
  const pack = `${folderPath}/${selected}`;

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }

  if (!existsSync(`${pack}.zip`)) {
    // HACK: Temporary solution until Red Stained is turned into a graphics pack
    if (existsSync(`${pack}.ips`)) {
      await applyPatch(basePath, "Graphics", selected, romPath);
    }

    return;
  }

  const config = readConfig(basePath, selected);
  decompress(`${pack}.zip`, packFolder);
  writeConfig(packFolder, config);
};

export default applyGraphics;
