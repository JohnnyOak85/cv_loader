// src/types.d.ts
export {};

declare global {
  interface Window {
    electron: {
      runProgram: () => Promise<string>;
      quit: () => Promise<void>;
    };
  }
}
