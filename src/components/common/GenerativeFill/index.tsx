import { IconArrowRight, IconSparkles } from "@tabler/icons-react";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { getGenerativeFill } from "../../../services/posts";
import Button from "../../form/Button";
import CopyBox from "../CopyBox";

type GenerativeFillProps = {
  postId: number;
  versionId: string;
  contentLength: number;
  availableCategories?: CategoryListItem[];
  onCopy?: (field: string, value: string) => void;
  disabled?: boolean;
};

type GenerativeFillData = {
  title: string;
  metaDescription: string;
  spot: string;
  suggestedCategory: string;
};

const GenerativeFill: FC<GenerativeFillProps> = ({
  postId,
  versionId,
  contentLength,
  availableCategories,
  onCopy,
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GenerativeFillData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFill = async () => {
    if (contentLength < 1000) return;

    try {
      setIsLoading(true);
      setError(null);

      const categoryNames = availableCategories?.map((cat) => cat.name) || [];
      const response = await getGenerativeFill(
        postId,
        versionId,
        categoryNames
      );

      if (response.success) {
        setData(response.data);
      } else {
        const errorMessage =
          response.status === 412
            ? "Gemini API key is not configured. Please contact the administrator."
            : response.error.message;
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch {
      const errorMessage = "Failed to generate content suggestions";
      setError(errorMessage);
      toast.error(errorMessage);
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
    <div className="w-full">
      <Button
        type="button"
        iconRight={IconSparkles}
        disabled={contentLength < 1000 || disabled}
        loading={isLoading}
        onClick={handleGenerateFill}
        className="w-full bg-gradient-to-r !from-indigo-500 !via-pink-500 !to-fuchsia-800 !text-pink-200 border-none"
        title={
          disabled
            ? "Save your changes first to generate AI suggestions"
            : undefined
        }
      >
        {isLoading ? "Generating..." : "Generate AI Suggestions"}
      </Button>

      {(contentLength < 1000 || disabled) && (
        <small className="text-xs text-smoke-600 text-center block mt-2">
          {disabled
            ? "Save your changes first. AI suggestions are generated from the saved version of your content."
            : "Content must be at least 1000 characters to use AI generation. AI suggestions are generated from the saved version of your content."}
        </small>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CopyBox label="Title" value={data.title} onCopy={handleCopy} />

              <CopyBox
                label="Spot (Teaser)"
                value={data.spot}
                onCopy={handleCopy}
              />

              <CopyBox
                label="Meta Description"
                value={data.metaDescription}
                onCopy={handleCopy}
              />

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <small className="text-sm font-medium text-smoke-700">
                    Suggested Category
                  </small>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("suggested category", data.suggestedCategory)
                    }
                    className="p-1 hover:bg-smoke-100 rounded transition-colors"
                  >
                    <IconArrowRight className="h-4 w-4 text-smoke-500" />
                  </button>
                </div>

                <p className="text-sm text-smoke-800">
                  {data.suggestedCategory}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerativeFill;
