/**
 * LABELS
 */

const labels = [
  { key: "Controls", preset: "Classic" },
  { key: "Graphics", preset: "Original" },
  { key: "Soundtracks", preset: "Famicom" },
];

labels.forEach(({ key, preset }) => {
  const id = key.toLowerCase();
  const stored = localStorage.getItem(key);
  const section = document.getElementById(id);

  if (!stored || !section) {
    return;
  }

  const presetLabels = [preset, ...JSON.parse(stored)];
  const selection = localStorage.getItem(id) || preset;

  presetLabels.forEach((label) => {
    const labelElement = document.createElement("label");

    if (label === selection) {
      labelElement.classList.add("active");
    }

    labelElement.textContent = label;
    labelElement.addEventListener("click", () => {
      section
        ?.querySelectorAll("label")
        .forEach((label) => label.classList.remove("active"));
      labelElement.classList.add("active");
      localStorage.setItem(id, label);
    });

    section?.appendChild(labelElement);
  });
});

/**
 * TABS
 */

const tabs = document.querySelectorAll(".tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", ({ target }) => {
    const tabId = (target as any).textContent.toLowerCase().trim();

    tabs.forEach((tab) => tab.classList.remove("active"));
    tab.classList.add("active");
    document
      .querySelectorAll(".tab-pane")
      .forEach((pane) => pane.classList.remove("active"));
    document.getElementById(tabId)?.classList.add("active");
  });
});

/**
 * BUTTONS
 */

const button = document.getElementById("run");

button?.addEventListener("click", async () => {
  await window.electron.runProgram();
});

const quitButton = document.getElementById("quit");

quitButton?.addEventListener("click", async () => {
  await window.electron.quit();
});
