import { IconApi, IconLock } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { EndpointCard } from "./components/EndpointCard";
import { APIDocumentation } from "./types";

const APIDocsPage: FC = () => {
  const [apiDocs, setApiDocs] = useState<APIDocumentation | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api-docs.json")
      .then((res) => res.json())
      .then((data) => setApiDocs(data))
      .catch((err) => console.error("Failed to load API docs:", err));
  }, []);

  if (!apiDocs) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-smoke-500">Loading API documentation...</div>
      </div>
    );
  }

  const tags = Array.from(
    new Set(apiDocs.endpoints.map((endpoint) => endpoint.tag))
  );

  const filteredEndpoints = selectedTag
    ? apiDocs.endpoints.filter((endpoint) => endpoint.tag === selectedTag)
    : apiDocs.endpoints;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gopher-500 to-gopher-600 dark:from-gopher-700 dark:to-gopher-800 rounded-xl p-8 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <IconApi size={32} strokeWidth={2} />
          <h1 className="text-3xl font-bold">{apiDocs.info.title}</h1>
        </div>
        <p className="text-gopher-50 mb-4">{apiDocs.info.description}</p>
        <div className="flex items-center gap-2 text-sm bg-white/10 rounded-lg px-4 py-2 inline-flex">
          <IconLock size={16} />
          <span>Version {apiDocs.info.version}</span>
        </div>
      </div>

      {/* Authentication Info */}
      <div className="bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <IconLock
            size={24}
            className="text-warning-600 dark:text-warning-400 flex-shrink-0 mt-1"
          />
          <div>
            <h3 className="font-semibold text-warning-900 dark:text-warning-100 mb-2">
              Authentication Required
            </h3>
            <p className="text-warning-800 dark:text-warning-200 text-sm mb-2">
              {apiDocs.authentication.description}
            </p>
            <code className="bg-warning-100 dark:bg-warning-900/40 px-3 py-1 rounded text-sm text-warning-900 dark:text-warning-100">
              {apiDocs.authentication.header}: your-trusted-frontend-key
            </code>
          </div>
        </div>
      </div>

      {/* Tag Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedTag === null
              ? "bg-gopher-500 text-white shadow-sm"
              : "bg-smoke-100 dark:bg-smoke-800 text-smoke-700 dark:text-smoke-300 hover:bg-smoke-200 dark:hover:bg-smoke-700"
          }`}
        >
          All Endpoints ({apiDocs.endpoints.length})
        </button>
        {tags.map((tag) => {
          const count = apiDocs.endpoints.filter((e) => e.tag === tag).length;
          return (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-gopher-500 text-white shadow-sm"
                  : "bg-smoke-100 dark:bg-smoke-800 text-smoke-700 dark:text-smoke-300 hover:bg-smoke-200 dark:hover:bg-smoke-700"
              }`}
            >
              {tag} ({count})
            </button>
          );
        })}
      </div>

      {/* Endpoints */}
      <div className="space-y-4">
        {filteredEndpoints.map((endpoint, index) => (
          <EndpointCard
            key={`${endpoint.method}-${endpoint.path}-${index}`}
            endpoint={endpoint}
            baseUrl={apiDocs.baseUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default APIDocsPage;
