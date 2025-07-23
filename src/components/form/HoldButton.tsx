import { Component, createSignal, onCleanup, JSX } from "solid-js";
import classNames from "classnames";

type HoldButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "primary" | "danger" | "success";
  class?: string;
};

const HoldButton: Component<HoldButtonProps> = ({
  color = "primary",
  type = "button",
  onclick,
  ...props
}) => {
  const [progress, setProgress] = createSignal(100);
  const holdDuration = 2000;

  let startTime: number | null = null;
  let rafId: number;
  let holdEvent: MouseEvent | TouchEvent | KeyboardEvent | null = null;
  let done = false;
  let isHolding = false;

  const clearState = () => {
    startTime = null;
    holdEvent = null;
    done = false;
  };

  const reset = () => {
    cancelAnimationFrame(rafId);
    clearState();
    setProgress(100);
  };

  const updateProgress = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const percent = Math.max(0, 100 - (elapsed / holdDuration) * 100);
    setProgress(percent);

    if (elapsed >= holdDuration && !done && onclick && holdEvent) {
      done = true;
      // setProgress(0); // kaldır
      requestAnimationFrame(() => {
        setTimeout(() => {
          // @ts-expect-error
          onclick(holdEvent);
          // reset(); // kaldır
          isHolding = true;
        }, 100);
      });
    } else if (!done) {
      rafId = requestAnimationFrame(updateProgress);
    }
  };

  const handleStart = (e: MouseEvent | TouchEvent | KeyboardEvent) => {
    if (isHolding) return;
    isHolding = true;
    cancelAnimationFrame(rafId);
    clearState();
    holdEvent = e;
    rafId = requestAnimationFrame(updateProgress);
  };

  const handleCancel = () => {
    isHolding = false;
    done = false;
    reset();
  };

  const classes = classNames(
    "p-2 text-xs rounded cursor-pointer transition-all ease-in-out focus:outline-none flex items-center justify-center gap-2 text-center w-full relative overflow-hidden",
    props.class,
    {
      "border-2 border-gopher-500 text-gopher-500 focus:outline-gopher-500":
        color === "primary",
      "border-2 border-danger-500 text-danger-500 focus:outline-danger-500":
        color === "danger",
      "border-2 border-success-500 text-success-500 focus:outline-success-500":
        color === "success",
    }
  );

  onCleanup(() => cancelAnimationFrame(rafId));

  return (
    <button
      {...props}
      type={type}
      class={classes}
      onclick={undefined}
      onMouseDown={(event) => handleStart(event)}
      onTouchStart={(event) => handleStart(event)}
      onMouseUp={handleCancel}
      onMouseLeave={handleCancel}
      onTouchEnd={handleCancel}
      onBlur={handleCancel}
      onKeyDown={(event) => {
        if (event.key === " " || event.key === "Enter") {
          event.preventDefault();
          handleStart(event);
        }
      }}
      onKeyUp={handleCancel}
    >
      <div
        class={classNames(
          "absolute inset-0 rounded-sm mix-blend-color-burn dark:mix-blend-difference transition-all duration-200 ease-linear",
          {
            "bg-gopher-900 dark:bg-gopher-500": color === "primary",
            "bg-danger-900 dark:bg-danger-500": color === "danger",
            "bg-success-900 dark:bg-success-500": color === "success",
          }
        )}
        style={{ right: `${progress()}%` }}
      />
      {props.children}
    </button>
  );
};

export default HoldButton;
