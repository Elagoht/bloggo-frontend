import { FC } from "react";
import { IconCheck } from "@tabler/icons-react";

type MultiSelectTagsProps = {
  values?: string[];
  onChange?: (values: string[]) => void;
  options: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
};

const MultiSelectTags: FC<MultiSelectTagsProps> = ({
  values = [],
  onChange,
  options,
}) => {
  const handleToggle = (optionValue: string) => {
    if (!onChange) return;

    if (values.includes(optionValue)) {
      onChange(values.filter((value) => value !== optionValue));
    } else {
      onChange([...values, optionValue]);
    }
  };

  // Sort options alphabetically only
  const sortedOptions = [...options].sort((a, b) => {
    return a.label.localeCompare(b.label);
  });

  return (
    <div className="flex flex-wrap gap-1">
      {sortedOptions.map((option, index) => {
        const isSelected = values.includes(option.value);

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleToggle(option.value)}
            disabled={option.disabled}
            className={`
              inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
              transition-all duration-150 border
              ${
                isSelected
                  ? "bg-gopher-100 dark:bg-gopher-900 text-gopher-800 dark:text-gopher-200 border-gopher-300 dark:border-gopher-700 shadow-sm"
                  : "bg-white dark:bg-smoke-900 text-smoke-700 dark:text-smoke-300 border-smoke-200 dark:border-smoke-700 hover:bg-smoke-50 dark:hover:bg-smoke-800"
              }
              ${
                option.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:shadow-sm"
              }
            `}
          >
            {isSelected && <IconCheck className="w-2.5 h-2.5" />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default MultiSelectTags;
