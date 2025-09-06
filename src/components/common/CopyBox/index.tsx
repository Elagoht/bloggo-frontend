import { IconCopy, IconCopyCheck } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";

type CopyBoxProps = {
  label: string;
  value: string;
  onCopy?: (field: string, value: string) => void;
};

const CopyBox: FC<CopyBoxProps> = ({ label, value, onCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);

    if (onCopy) {
      onCopy(label.toLowerCase(), value);
    }
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/40">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-smoke-700">{label}</label>
        <button
          type="button"
          onClick={handleCopy}
          className="p-1 hover:bg-smoke-100 rounded transition-colors"
        >
          {isCopied ? (
            <IconCopyCheck className="h-4 w-4 text-green-500" />
          ) : (
            <IconCopy className="h-4 w-4 text-smoke-500" />
          )}
        </button>
      </div>
      <p className="text-sm text-smoke-800">{value}</p>
    </div>
  );
};

export default CopyBox;
