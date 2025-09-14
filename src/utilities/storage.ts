export interface StorageInfo {
  value: number;
  unit: string;
  formatted: string;
}

export function formatBytes(bytes: number): StorageInfo {
  if (bytes === 0) {
    return { value: 0, unit: "B", formatted: "0 B" };
  }

  const units = ["B", "KB", "MB", "GB", "TB"];
  const threshold = 1024;

  let unitIndex = 0;
  let value = bytes;

  while (value >= threshold && unitIndex < units.length - 1) {
    value /= threshold;
    unitIndex++;
  }

  // Round to 1 decimal place for display
  const roundedValue = Math.round(value * 10) / 10;

  return {
    value: roundedValue,
    unit: units[unitIndex],
    formatted: `${roundedValue} ${units[unitIndex]}`,
  };
}

export function calculateStoragePercentage(
  used: number,
  total: number
): number {
  if (total === 0) return 0;
  return Math.round((used / total) * 100);
}

export function calculateRemainingUploads(
  freeBytes: number,
  averageImageSize: number = 2 * 1024 * 1024 // 2MB default
): number {
  if (freeBytes <= 0 || averageImageSize <= 0) return 0;
  return Math.floor(freeBytes / averageImageSize);
}

export function calculateRemainingVersions(
  freeBytes: number,
  averageVersionSize: number = 50 * 1024 // 50KB default for text content
): number {
  if (freeBytes <= 0 || averageVersionSize <= 0) return 0;
  return Math.floor(freeBytes / averageVersionSize);
}

export function getStorageColor(percentage: number): string {
  if (percentage >= 90) return "text-danger-600";
  if (percentage >= 75) return "text-warning-600";
  return "text-success-600";
}
