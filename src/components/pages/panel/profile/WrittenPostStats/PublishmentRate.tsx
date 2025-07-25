import classNames from "classnames";
import { Component, createMemo } from "solid-js";

type PublishmentRateProps = Pick<
  ResponseUser,
  "publishedPostCount" | "writtenPostCount"
>;

const PublishmentRate: Component<PublishmentRateProps> = ({
  publishedPostCount,
  writtenPostCount,
}) => {
  const value = createMemo(() => {
    const ratio = (publishedPostCount / writtenPostCount || 0) * 100;
    const normalized = Math.min(100, Math.max(0, ratio));
    return normalized;
  });

  return (
    <fieldset
      class="px-4 py-2 rounded-full text-center leading-snug text-success-50"
      style={{ "background-color": valueColor(value()) }}
    >
      <legend class="bg-smoke-200 text-smoke-900 leading-snug px-2 rounded-full">
        W/P
      </legend>
      {value().toFixed(2)}%
    </fieldset>
  );
};

export default PublishmentRate;

const valueColor = (value: number): string => {
  const colors = [
    { min: 0, max: 10, color: "#3D3D3D" },
    { min: 10, max: 20, color: "#3E4B40" },
    { min: 20, max: 50, color: "#405A44" },
    { min: 30, max: 40, color: "#416847" },
    { min: 40, max: 70, color: "#43764A" },
    { min: 50, max: 60, color: "#44854E" },
    { min: 60, max: 90, color: "#469351" },
    { min: 70, max: 80, color: "#47A255" },
    { min: 80, max: 90, color: "#48B058" },
    { min: 90, max: 100, color: "#48BE5B" },
  ];

  if (value < 0 || value > 100 || isNaN(value)) {
    return "bg-gray-500";
  }

  const determinedColor =
    colors.find(({ min, max }) => value >= min && value <= max)?.color ||
    "bg-gray-500";

  return determinedColor;
};
