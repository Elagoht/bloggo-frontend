import { IconLoader, IconSparkles } from "@tabler/icons-react";
import { FC, useState } from "react";
import { getCategoryGenerativeFill } from "../../../services/categories";
import Button from "../../form/Button";
import CopyBox from "../CopyBox";

type CategoryGenerativeFillProps = {
  categoryName: string;
  onCopy?: (field: string, value: string) => void;
};

const CategoryGenerativeFill: FC<CategoryGenerativeFillProps> = ({
  categoryName,
  onCopy,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<CategoryGenerativeFillResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFill = async () => {
    if (!categoryName.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await getCategoryGenerativeFill(categoryName);

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error.message);
      }
    } catch {
      setError("Failed to generate content suggestions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (field: string, value: string) => {
    if (onCopy) {
      onCopy(field, value);
    }
  };

  return (
    <div>
      <Button
        type="button"
        iconRight={isLoading ? IconLoader : IconSparkles}
        disabled={!categoryName.trim() || isLoading}
        onClick={handleGenerateFill}
        className="w-full bg-gradient-to-r !from-indigo-500 !via-pink-500 !to-fuchsia-800 !text-pink-200 border-none"
      >
        {isLoading ? "Generating..." : "Generate Fill"}
      </Button>

      {!categoryName.trim() && (
        <p className="text-sm text-smoke-600">
          Enter a category name to use AI generation
        </p>
      )}

      {error && (
        <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
          <p className="text-sm text-danger-700">{error}</p>
        </div>
      )}

      {data && (
        <div className="mt-4 relative overflow-hidden rounded-lg border border-rose-300 dark:border-rose-800 bg-smoke-200 dark:bg-smoke-900">
          {/* Magical gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-rose-400/50 animate-pulse" />

          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/50 via-purple-400/5 to-pink-400/5" />

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <IconSparkles className="h-5 w-5 text-rose-500" />
              <h3 className="text-lg font-semibold text-rose-500">
                AI Suggestions
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <CopyBox
                label="Spot Text"
                value={data.spot}
                onCopy={handleCopy}
              />

              <CopyBox
                label="Description"
                value={data.description}
                onCopy={handleCopy}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryGenerativeFill;
