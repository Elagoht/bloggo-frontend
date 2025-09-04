export const isMac =
  typeof navigator !== "undefined" && /Mac/i.test(navigator.platform);

export const keyLabels: Record<string, string | ((isMac: boolean) => string)> =
  {
    ctrlorcmd: (mac: boolean) => (mac ? "⌘" : "Ctrl"),
    ctrl: "Ctrl",
    cmd: "⌘",
    meta: "⌘",
    alt: (mac: boolean) => (mac ? "Option" : "Alt"),
    altoroption: (mac: boolean) => (mac ? "⌥" : "Alt"),
    option: "⌥",
    shift: "Shift",
    plus: "+",
    " ": "Space",
    space: "Space",
    enter: "↵",
    escape: "␛",
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
  };

export const keyAliases: Record<string, string> = {
  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright",
};
