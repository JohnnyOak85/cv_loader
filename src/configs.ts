import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

const readConfig = (basePath: string, config: string) => {
  const folderPath = `${basePath}/Configs`;
  const configPath = `${folderPath}/${config}.txt`;

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }

  if (!existsSync(configPath)) {
    return "";
  }

  return readFileSync(configPath, "utf8");
};

const writeConfig = (packFolder: string, configFile: string) => {
  const hiresPath = `${packFolder}/hires.txt`;
  const config = existsSync(hiresPath)
    ? readFileSync(hiresPath, "utf8")
    : "<ver>101";

  writeFileSync(hiresPath, `${config}\n${configFile}`);
};

const applyConfig = (
  basePath: string,
  packFolder: string,
  selected: string
) => {
  const config = readConfig(basePath, selected);
  writeConfig(packFolder, config);
};

export { readConfig, writeConfig, applyConfig };
