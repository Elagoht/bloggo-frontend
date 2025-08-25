export class PostStatus {
  static getStatusColor(
    status: number,
    variant: "text" | "background" | "badge" = "text"
  ): string {
    const colorMap: Record<
      number,
      Record<"text" | "background" | "badge", string>
    > = {
      0: {
        // DRAFT
        text: "text-smoke-600 dark:text-smoke-400",
        background:
          "bg-smoke-200 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400",
        badge:
          "bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400 border-smoke-200 dark:border-smoke-700",
      },
      1: {
        // PENDING
        text: "text-yellow-600 dark:text-yellow-400",
        background:
          "bg-yellow-200 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-400",
        badge:
          "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700",
      },
      2: {
        // APPROVED
        text: "text-blue-600 dark:text-blue-400",
        background:
          "bg-blue-200 dark:bg-blue-800 text-blue-600 dark:text-blue-400",
        badge:
          "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700",
      },
      3: {
        // REJECTED
        text: "text-red-600 dark:text-red-400",
        background: "bg-red-200 dark:bg-red-800 text-red-600 dark:text-red-400",
        badge:
          "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 border-red-200 dark:border-red-700",
      },
      4: {
        // SCHEDULED
        text: "text-purple-600 dark:text-purple-400",
        background:
          "bg-purple-200 dark:bg-purple-800 text-purple-600 dark:text-purple-400",
        badge:
          "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-700",
      },
      5: {
        // PUBLISHED
        text: "text-green-600 dark:text-green-400",
        background:
          "bg-green-200 dark:bg-green-800 text-green-600 dark:text-green-400",
        badge:
          "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700",
      },
    };

    const defaultColors = {
      text: "text-smoke-600 dark:text-smoke-400",
      background:
        "bg-smoke-200 dark:bg-smoke-800 text-smoke-600 dark:text-smoke-400",
      badge:
        "bg-smoke-100 dark:bg-smoke-900 text-smoke-600 dark:text-smoke-400 border-smoke-200 dark:border-smoke-700",
    };

    return colorMap[status]?.[variant] || defaultColors[variant];
  }

  static getStatusText(status: number): string {
    const textMap: Record<number, string> = {
      0: "Draft",
      1: "Pending",
      2: "Approved",
      3: "Rejected",
      4: "Scheduled",
      5: "Published",
    };

    return textMap[status] || "Unknown";
  }
}
