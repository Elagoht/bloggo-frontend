import { IconCopy, IconSparkles } from "@tabler/icons-react";
import { FC, useState } from "react";
import { getGenerativeFill } from "../../../services/posts";
import Button from "../../form/Button";

interface GenerativeFillProps {
  postId: number;
  versionId: string;
  contentLength: number;
  onCopy?: (field: string, value: string) => void;
}

interface GenerativeFillData {
  title: string;
  metaDescription: string;
  spot: string;
  suggestedCategory: string;
}

const GenerativeFill: FC<GenerativeFillProps> = ({
  postId,
  versionId,
  contentLength,
  onCopy,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<GenerativeFillData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateFill = async () => {
    if (contentLength < 1000) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await getGenerativeFill(postId, versionId);

      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error.message);
      }
    } catch (err) {
      setError("Failed to generate content suggestions");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    if (onCopy) {
      onCopy(field, value);
    }
  };

  return (
    <div>
      <Button
        type="button"
        color="warning"
        iconLeft={IconSparkles}
        disabled={contentLength < 1000 || isLoading}
        onClick={handleGenerateFill}
        className="w-full"
      >
        {isLoading ? "Generating..." : "Generate AI Suggestions"}
      </Button>

      {contentLength < 1000 && (
        <p className="text-sm text-smoke-600">
          Content must be at least 1000 characters to use AI generation
        </p>
      )}

      {error && (
        <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg">
          <p className="text-sm text-danger-700">{error}</p>
        </div>
      )}

      {data && (
        <div className="mt-4 relative overflow-hidden rounded-lg border border-gopher-200">
          {/* Magical gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-gopher-400/10 animate-pulse" />

          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5" />

          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <IconSparkles className="h-5 w-5 text-gopher-600" />
              <h3 className="text-lg font-semibold text-gopher-800">
                AI Suggestions
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-smoke-700">
                    Title
                  </label>

                  <button
                    type="button"
                    onClick={() => handleCopy("title", data.title)}
                    className="p-1 hover:bg-smoke-100 rounded transition-colors"
                  >
                    <IconCopy className="h-4 w-4 text-smoke-500" />
                  </button>
                </div>
                <p className="text-sm text-smoke-800">{data.title}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-smoke-700">
                    Spot (Teaser)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleCopy("spot", data.spot)}
                    className="p-1 hover:bg-smoke-100 rounded transition-colors"
                  >
                    <IconCopy className="h-4 w-4 text-smoke-500" />
                  </button>
                </div>
                <p className="text-sm text-smoke-800">{data.spot}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-smoke-700">
                    Meta Description
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleCopy("metaDescription", data.metaDescription)
                    }
                    className="p-1 hover:bg-smoke-100 rounded transition-colors"
                  >
                    <IconCopy className="h-4 w-4 text-smoke-500" />
                  </button>
                </div>
                <p className="text-sm text-smoke-800">{data.metaDescription}</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-white/40">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-smoke-700">
                    Suggested Category
                  </label>
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
