import { execSync } from "child_process";
import { existsSync } from "fs";

const applyPatch = async (
  basePath: string,
  folderName: string,
  patchName: string,
  romPath: string
) => {
  const patcher = "Lunar IPS.exe";
  const patcherPath = `${basePath}/${patcher}`;
  const patchPath = `${basePath}/${folderName}/${patchName}.ips`;

  if (!existsSync(patcherPath)) {
    throw new Error("Patcher executable missing");
  }

  if (!existsSync(patchPath) || !existsSync(romPath)) {
    return;
  }

  execSync(`"${patcherPath}" -ApplyIPS "${patchPath}" "${romPath}"`);
};

export default applyPatch;
