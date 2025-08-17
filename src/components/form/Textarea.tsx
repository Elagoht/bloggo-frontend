import { Component, JSX } from "solid-js";
import classNames from "classnames";

type TextareaProps = JSX.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  iconLeft?: Component;
  iconRight?: Component;
  rows?: number;
};

const Textarea: Component<TextareaProps> = ({
  label,
  iconLeft,
  iconRight,
  rows = 4,
  ...props
}) => {
  const hasIcons = iconLeft || iconRight;

  const textarea = hasIcons ? (
    <div class="relative">
      {iconLeft && (
        <div class="absolute left-2.5 top-3 text-smoke-500 dark:text-smoke-400 pointer-events-none">
          {iconLeft({ size: 18 })}
        </div>
      )}

      <textarea
        {...props}
        rows={rows}
        class={classNames(
          "p-2 rounded text-sm bg-smoke-200 text-smoke-950 dark:bg-smoke-900 dark:text-smoke-100 transition-all ease-in-out focus:outline-none focus:outline-smoke-300 dark:focus:outline-smoke-700 placeholder:text-smoke-500 w-full resize-y min-h-[6rem]",
          {
            "pl-9": iconLeft,
            "pr-9": iconRight,
          },
          props.class
        )}
      />

      {iconRight && (
        <div class="absolute right-2.5 top-3 text-smoke-500 dark:text-smoke-400 pointer-events-none">
          {iconRight({ size: 18 })}
        </div>
      )}
    </div>
  ) : (
    <textarea
      {...props}
      rows={rows}
      class={classNames(
        "p-2 rounded text-sm bg-smoke-200 text-smoke-950 dark:bg-smoke-900 dark:text-smoke-100 transition-all ease-in-out focus:outline-none focus:outline-smoke-300 dark:focus:outline-smoke-700 placeholder:text-smoke-500 resize-y min-h-[6rem]",
        props.class
      )}
    />
  );

  return label ? (
    <label class="flex flex-col gap-0.5">
      <span class="text-sm">{label}</span>

      {textarea}
    </label>
  ) : (
    textarea
  );
};

export default Textarea;
