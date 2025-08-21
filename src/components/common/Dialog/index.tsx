import React, { act, useEffect, useRef } from "react";
import { IconX } from "@tabler/icons-react";
import classNames from "classnames";
import Button, { ButtonProps } from "../../form/Button";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: ButtonProps[];
  size?: "sm" | "md" | "lg";
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = "md",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className={classNames(
        "backdrop:bg-black backdrop:bg-opacity-50 bg-transparent p-0 rounded-lg shadow-xl w-full",
        {
          "max-w-sm": size === "sm",
          "max-w-md": size === "md",
          "max-w-lg": size === "lg",
        }
      )}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
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
        <div className="p-2 font-light leading-snug text-gray-700 dark:text-gray-300">
          {children}
        </div>

        {/* Actions */}
        {actions && (
          <div className="p-2 border-t flex gap-3 justify-end border-smoke-200 dark:border-smoke-800">
            {actions.map((action) => (
              <Button {...action} />
            ))}
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Dialog;
