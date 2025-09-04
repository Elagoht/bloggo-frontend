import { FC } from "react";
import { isMac, keyLabels } from ".";

type ShortcutLabelProps = {
  shortcut?: string;
};

const ShortcutLabel: FC<ShortcutLabelProps> = ({ shortcut }) => {
  if (!shortcut) return null;
  const parts = shortcut.split("+").map((key) => key.toLowerCase());

  return (
    <span className="ml-2 text-xs flex gap-1">
      {parts.map((part, i) => {
        const labelDef = keyLabels[part];
        const label =
          typeof labelDef === "function"
            ? labelDef(isMac)
            : labelDef ?? part.toUpperCase();
        return (
          <kbd
            key={i}
            className="max-md:hidden px-1.5 py-0.5 rounded text-black dark:text-white bg-white dark:bg-black bg-opacity-30 dark:bg-opacity-30"
          >
            {label}
          </kbd>
        );
      })}
    </span>
  );
};

export default ShortcutLabel;
