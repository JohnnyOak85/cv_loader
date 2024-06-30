import AdmZip from "adm-zip";

const decompress = (origin: string, destiny: string) => {
  try {
    new AdmZip(origin).extractAllTo(destiny, true);
  } catch (_) {}
};

export default decompress;
