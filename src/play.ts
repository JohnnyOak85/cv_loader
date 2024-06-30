import { execSync } from "child_process";
import path from "path";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  unlinkSync,
} from "fs";
import { localStorage } from "electron-browser-storage";
import applyGraphics from "./graphics";
import applySoundtrack from "./soundtracks";
import applyControls from "./controls";

const getPackPath = (basePath: string, romName: string) => {
  const folderPath = `${basePath}/HdPacks`;
  const packPath = `${folderPath}/${romName}`;

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }

  if (!existsSync(packPath)) {
    mkdirSync(packPath);
  }

  return packPath;
};

const cleanPreviousConfig = (folderPath: string) => {
  const files = readdirSync(folderPath);

  files.forEach((file) => unlinkSync(`${folderPath}/${file}`));
};

const getRomName = async () => {
  try {
    return await localStorage.getItem("rom");
  } catch {
    throw new Error("Game ROM missing");
  }
};

const copyGame = (basePath: string, fileName: string, destination: string) => {
  const folderPath = `${basePath}/Game`;
  const packsPath = `${basePath}/HdPacks`;
  const gamePath = `${folderPath}/${fileName}.nes`;

  if (!existsSync(gamePath)) {
    throw new Error("Game ROM missing");
  }

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }

  if (!existsSync(packsPath)) {
    mkdirSync(packsPath);
  }

  copyFileSync(gamePath, destination);
};

const play = async (appPath: string) => {
  const basePath = path.resolve(appPath, "..");
  const romName = await getRomName();
  const packFolder = getPackPath(basePath, romName);
  const emulatorPath = `${basePath}/Mesen.exe`;
  const romPath = `${packFolder}/${romName}.nes`;

  cleanPreviousConfig(packFolder);
  copyGame(basePath, romName, romPath);

  await applyGraphics(basePath, packFolder, romPath);
  await applyControls(basePath, romPath);
  await applySoundtrack(basePath, packFolder, romPath);

  if (!existsSync(emulatorPath)) {
    throw new Error("Emulator executable missing");
  }

  if (!existsSync(romPath)) {
    throw new Error("Game ROM missing");
  }

  execSync(`"${emulatorPath}" "${romPath}"`);
};

export { play };
