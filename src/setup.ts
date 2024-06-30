import path from "path";
import { existsSync, mkdirSync, readdirSync } from "fs";
import { localStorage } from "electron-browser-storage";

const setupGameFolder = (basePath: string) => {
  const folderPath = `${basePath}/Game`;

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }

  return folderPath;
};

const setROMName = async (gamesFolder: string) => {
  const files = readdirSync(gamesFolder);
  const gameFile = files[0];

  if (!gameFile) {
    throw new Error("Game ROM missing");
  }

  await localStorage.setItem("rom", files[0].split(".")[0]);
};

const setFolders = async (basePath: string) => {
  const folders = ["Controls", "Soundtracks", "Graphics"];

  await Promise.all(
    folders.map(async (folder) => {
      const folderPath = `${basePath}/${folder}`;

      if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
      }

      const files = readdirSync(folderPath).map((file) => file.split(".")[0]);
      await localStorage.setItem(folder, JSON.stringify(files));
    })
  );
};

const setupChoices = async () => {
  const choices = [
    { key: "graphics", value: "Original" },
    { key: "soundtracks", value: "Famicom" },
    { key: "controls", value: "Classic" },
  ];

  await Promise.all(
    choices.map(async ({ key, value }) => {
      try {
        const item = await localStorage.getItem(key);

        if (typeof item !== "string") {
          await localStorage.setItem(key, value);
        }
      } catch (error) {
        await localStorage.setItem(key, value);
      }
    })
  );
};

const setup = async (appPath: string) => {
  const basePath = path.resolve(appPath, "..");
  const gameFolder = setupGameFolder(basePath);

  await setROMName(gameFolder);
  await localStorage.setItem("basePath", basePath);
  await setFolders(basePath);
  await setupChoices();
};

export { setup };
