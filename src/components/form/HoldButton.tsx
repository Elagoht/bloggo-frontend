import classNames from "classnames";
import { ButtonHTMLAttributes, FC, useEffect, useRef, useState } from "react";

type HoldButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: "primary" | "danger" | "success";
  onClick?: (e: MouseEvent | TouchEvent | KeyboardEvent) => void;
};

const HoldButton: FC<HoldButtonProps> = ({
  color = "primary",
  type = "button",
  onClick,
  className,
  ...props
}) => {
  const [progress, setProgress] = useState(100);
  const holdDuration = 2000;

  const startTimeRef = useRef<number | null>(null);
  const rafIdRef = useRef<number>(0);
  const holdEventRef = useRef<MouseEvent | TouchEvent | KeyboardEvent | null>(
    null
  );
  const doneRef = useRef(false);
  const isHoldingRef = useRef(false);

  const clearState = () => {
    startTimeRef.current = null;
    holdEventRef.current = null;
    doneRef.current = false;
  };

  const reset = () => {
    cancelAnimationFrame(rafIdRef.current);
    clearState();
    setProgress(100);
  };

  const updateProgress = (timestamp: number) => {
    if (startTimeRef.current === null) startTimeRef.current = timestamp;
    const elapsed = timestamp - startTimeRef.current;
    const percent = Math.max(0, 100 - (elapsed / holdDuration) * 100);
    setProgress(percent);

    if (
      elapsed >= holdDuration &&
      !doneRef.current &&
      onClick &&
      holdEventRef.current
    ) {
      doneRef.current = true;
      requestAnimationFrame(() => {
        setTimeout(() => {
          onClick(holdEventRef.current!);
          isHoldingRef.current = true;
        }, 100);
      });
    } else if (!doneRef.current) {
      rafIdRef.current = requestAnimationFrame(updateProgress);
    }
  };

  const handleStart = (
    event: React.MouseEvent | React.TouchEvent | React.KeyboardEvent
  ) => {
    if (isHoldingRef.current) return;
    isHoldingRef.current = true;
    cancelAnimationFrame(rafIdRef.current);
    clearState();
    holdEventRef.current = event.nativeEvent as
      | MouseEvent
      | TouchEvent
      | KeyboardEvent;
    rafIdRef.current = requestAnimationFrame(updateProgress);
  };

  const handleCancel = () => {
    isHoldingRef.current = false;
    doneRef.current = false;
    reset();
  };

  const classes = classNames(
    "p-2 text-xs rounded cursor-pointer transition-all ease-in-out focus:outline-none flex items-center justify-center gap-2 text-center w-full relative overflow-hidden",
    className,
    {
      "border-2 border-gopher-500 text-gopher-500 focus:outline-gopher-500":
        color === "primary",
      "border-2 border-danger-500 text-danger-500 focus:outline-danger-500":
        color === "danger",
      "border-2 border-success-500 text-success-500 focus:outline-success-500":
        color === "success",
    }
  );

  useEffect(() => {
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  return (
    <button
      {...props}
      type={type}
      className={classes}
      onClick={undefined}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
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
        className={classNames(
          "absolute inset-0 rounded-sm mix-blend-color-burn dark:mix-blend-difference transition-all duration-200 ease-linear",
          {
            "bg-gopher-900 dark:bg-gopher-500": color === "primary",
            "bg-danger-900 dark:bg-danger-500": color === "danger",
            "bg-success-900 dark:bg-success-500": color === "success",
          }
        )}
        style={{ right: `${progress}%` }}
      />
      {props.children}
    </button>
  );
};

export default HoldButton;
