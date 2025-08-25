import { IconX } from "@tabler/icons-react";
import classNames from "classnames";
import { FC, ReactNode, useEffect, useState } from "react";
import Button, { ButtonProps } from "../../form/Button";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  actions?: ButtonProps[];
  size?: "sm" | "md" | "lg";
};

const Dialog: FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = "md",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "unset";
      }, 200);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={classNames(
          "fixed inset-0 bg-black backdrop-blur-sm transition-opacity duration-200",
          isAnimating ? "bg-opacity-80" : "bg-opacity-0"
        )}
        onClick={onClose}
      />
      <div
        className={classNames(
          "relative rounded-lg shadow-xl w-full transition-all duration-200 transform",
          {
            "max-w-sm": size === "sm",
            "max-w-md": size === "md",
            "max-w-lg": size === "lg",
          },
          isAnimating
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        )}
      >
        <div className="rounded-lg overflow-hidden border bg-white dark:bg-smoke-950 border-smoke-200 dark:border-smoke-800">
          {/* Header */}
          <div className="p-2 border-b flex items-center justify-between border-smoke-200 dark:border-smoke-800">
            <h2 className="text-lg font-semibold text-smoke-900 dark:text-smoke-50">
              {title}
            </h2>

            <Button
              onClick={onClose}
              variant="text"
              color="danger"
              className="!rounded-full !p-2"
              iconLeft={IconX}
            />
          </div>

          {/* Content */}
          <div className="p-2 font-light leading-snug text-smoke-700 dark:text-smoke-300">
            {children}
          </div>

          {/* Actions */}
          {actions && (
            <div className="p-2 border-t flex gap-2 justify-end border-smoke-200 dark:border-smoke-800">
              {actions.map((action) => (
                <Button {...action} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
