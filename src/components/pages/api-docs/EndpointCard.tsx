import { IconChevronUp } from "@tabler/icons-react";
import classNames from "classnames";
import { FC, useState } from "react";
import Container from "../../layout/Container";
import { ParametersSection } from "./ParametersSection";
import { RequestBodySection } from "./RequestBodySection";
import { ResponsesSection } from "./ResponsesSection";

interface EndpointCardProps {
  endpoint: APIEndpoint;
  baseUrl: string;
}

const methodColors = {
  GET: {
    bg: "bg-blue-500 dark:bg-blue-600",
    text: "text-white",
    border: "border-blue-600 dark:border-blue-500",
    headerBg: "bg-blue-50 dark:bg-blue-950/50",
  },
  POST: {
    bg: "bg-green-600 dark:bg-green-600",
    text: "text-white",
    border: "border-green-700 dark:border-green-500",
    headerBg: "bg-green-50 dark:bg-green-950/50",
  },
  PUT: {
    bg: "bg-orange-500 dark:bg-orange-600",
    text: "text-white",
    border: "border-orange-600 dark:border-orange-500",
    headerBg: "bg-orange-50 dark:bg-orange-950/50",
  },
  PATCH: {
    bg: "bg-purple-500 dark:bg-purple-600",
    text: "text-white",
    border: "border-purple-600 dark:border-purple-500",
    headerBg: "bg-purple-50 dark:bg-purple-950/50",
  },
  DELETE: {
    bg: "bg-red-600 dark:bg-red-600",
    text: "text-white",
    border: "border-red-700 dark:border-red-500",
    headerBg: "bg-red-50 dark:bg-red-950/50",
  },
};

export const EndpointCard: FC<EndpointCardProps> = ({ endpoint, baseUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = methodColors[endpoint.method];

  return (
    <Container className="!gap-0 rounded-lg overflow-hidden bg-white dark:bg-smoke-900 shadow">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={classNames(
          "w-full p-2 flex items-center gap-2 transition-all shadow",
          colors.headerBg,
          "hover:opacity-95"
        )}
      >
        <span
          className={classNames(
            "px-2 py-1 rounded text-xs font-bold uppercase shadow-md",
            colors.bg,
            colors.text,
            "border border-transparent"
          )}
        >
          {endpoint.method}
        </span>

        <code className="text-sm font-mono text-smoke-800 dark:text-smoke-200 flex-1 text-left">
          {baseUrl}
          {endpoint.path}
        </code>

        <div className="text-right flex-shrink-0 hidden sm:block text-xs font-medium text-smoke-900 dark:text-smoke-100">
          {endpoint.summary}
        </div>

        <IconChevronUp
          size={18}
          className={classNames(
            "text-smoke-500 flex-shrink-0 transition-transform",
            {
              "rotate-180": isExpanded,
            }
          )}
        />
      </button>

      {/* Expanded Content */}
      <div
        className={classNames(
          "bg-smoke-100/50 dark:bg-smoke-950/80 grid transition-all duration-300 ease-in-out",
          {
            "grid-rows-[1fr]": isExpanded,
            "grid-rows-[0fr]": !isExpanded,
          }
        )}
      >
        <div
          className={classNames(
            "flex flex-col gap-4 overflow-hidden px-4 transition-all duration-300 ease-in-out",
            { "py-4": isExpanded, "opacity-0": !isExpanded }
          )}
        >
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-smoke-800 dark:text-smoke-200 mb-1 uppercase tracking-wide">
              Description
            </h4>
            <p className="text-xs text-smoke-600 dark:text-smoke-400">
              {endpoint.description}
            </p>
          </div>

          {/* Parameters */}
          {endpoint.parameters && endpoint.parameters.length > 0 && (
            <ParametersSection parameters={endpoint.parameters} />
          )}

          {/* Request Body */}
          {endpoint.requestBody && (
            <RequestBodySection requestBody={endpoint.requestBody} />
          )}

          {/* Responses */}
          <ResponsesSection responses={endpoint.responses} />
        </div>
      </div>
    </Container>
  );
};
