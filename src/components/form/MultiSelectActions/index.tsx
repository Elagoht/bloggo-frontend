import { FC } from "react";
import { IconCheck } from "@tabler/icons-react";

type MultiSelectActionsProps = {
  values?: string[];
  onChange?: (values: string[]) => void;
  options: Array<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
};

const MultiSelectActions: FC<MultiSelectActionsProps> = ({
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

  const getActionColorClasses = (action: string, isSelected: boolean) => {
    if (isSelected) {
      // Each action gets a unique color
      if (action === "created") return "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700";
      if (action === "added") return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700";
      if (action === "approved") return "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 border-teal-300 dark:border-teal-700";
      if (action === "published") return "bg-lime-100 dark:bg-lime-900 text-lime-800 dark:text-lime-200 border-lime-300 dark:border-lime-700";

      if (action === "updated") return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700";
      if (action === "assigned") return "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 border-indigo-300 dark:border-indigo-700";

      if (action === "submitted") return "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700";
      if (action === "requested") return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700";

      if (action === "deleted") return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700";
      if (action === "removed") return "bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-700";
      if (action === "rejected") return "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 border-pink-300 dark:border-pink-700";
      if (action === "denied") return "bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-200 border-fuchsia-300 dark:border-fuchsia-700";
      if (action === "unpublished") return "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700";

      if (action === "login") return "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 border-cyan-300 dark:border-cyan-700";
      if (action === "logout") return "bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700";

      if (action === "duplicated_from") return "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700";
      if (action === "replaced_published") return "bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 border-violet-300 dark:border-violet-700";
    } else {
      // Subtle color hints for unselected items
      if (action === "created") return "bg-white dark:bg-smoke-900 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950";
      if (action === "added") return "bg-white dark:bg-smoke-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950";
      if (action === "approved") return "bg-white dark:bg-smoke-900 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-950";
      if (action === "published") return "bg-white dark:bg-smoke-900 text-lime-700 dark:text-lime-300 border-lime-200 dark:border-lime-800 hover:bg-lime-50 dark:hover:bg-lime-950";

      if (action === "updated") return "bg-white dark:bg-smoke-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950";
      if (action === "assigned") return "bg-white dark:bg-smoke-900 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950";

      if (action === "submitted") return "bg-white dark:bg-smoke-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800 hover:bg-amber-50 dark:hover:bg-amber-950";
      if (action === "requested") return "bg-white dark:bg-smoke-900 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-50 dark:hover:bg-yellow-950";

      if (action === "deleted") return "bg-white dark:bg-smoke-900 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-950";
      if (action === "removed") return "bg-white dark:bg-smoke-900 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-950";
      if (action === "rejected") return "bg-white dark:bg-smoke-900 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950";
      if (action === "denied") return "bg-white dark:bg-smoke-900 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-800 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-950";
      if (action === "unpublished") return "bg-white dark:bg-smoke-900 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950";

      if (action === "login") return "bg-white dark:bg-smoke-900 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-950";
      if (action === "logout") return "bg-white dark:bg-smoke-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950";

      if (action === "duplicated_from") return "bg-white dark:bg-smoke-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950";
      if (action === "replaced_published") return "bg-white dark:bg-smoke-900 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950";
    }

    // Default fallback
    return isSelected
      ? "bg-gopher-100 dark:bg-gopher-900 text-gopher-800 dark:text-gopher-200 border-gopher-300 dark:border-gopher-700"
      : "bg-white dark:bg-smoke-900 text-smoke-700 dark:text-smoke-300 border-smoke-200 dark:border-smoke-700 hover:bg-smoke-50 dark:hover:bg-smoke-800";
  };

  // Sort options: selected items first, then alphabetically
  const sortedOptions = [...options].sort((a, b) => {
    const aSelected = values.includes(a.value);
    const bSelected = values.includes(b.value);

    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;

    return a.label.localeCompare(b.label);
  });

  return (
    <div className="flex flex-wrap gap-1">
      {sortedOptions.map((option) => {
        const isSelected = values.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            disabled={option.disabled}
            className={`
              inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
              transition-all duration-150 border shadow-sm
              ${getActionColorClasses(option.value, isSelected)}
              ${
                option.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }
            `}
          >
            {isSelected && (
              <IconCheck className="w-2.5 h-2.5" />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default MultiSelectActions;