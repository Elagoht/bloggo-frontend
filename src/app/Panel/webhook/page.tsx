import {
  IconBolt,
  IconExternalLink,
  IconKey,
  IconTrash,
  IconWebhook,
} from "@tabler/icons-react";
import { FC, useState, useMemo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../../components/form/Button";
import Input from "../../../components/form/Input";
import RouteGuard from "../../../components/guards/RouteGuard";
import Container from "../../../components/layout/Container";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import FormCard from "../../../components/layout/Container/FormCard";
import {
  getConfig,
  updateConfig,
  getHeaders,
  bulkUpsertHeaders,
  fireWebhook,
} from "../../../services/webhook";
import { WebhookHeader } from "../../../types/webhook";

interface HeaderRow {
  id: string;
  key: string;
  value: string;
  status: "saved" | "new" | "edited";
  originalKey?: string;
  originalValue?: string;
}

const WebhookPage: FC = () => {
  const navigate = useNavigate();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [originalUrl, setOriginalUrl] = useState("");
  const [rows, setRows] = useState<HeaderRow[]>([
    { id: crypto.randomUUID(), key: "", value: "", status: "new" },
  ]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [firing, setFiring] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  // Fetch existing webhook config and headers on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch config
        const configResponse = await getConfig();
        if (configResponse.success && configResponse.data) {
          setWebhookUrl(configResponse.data.url || "");
          setOriginalUrl(configResponse.data.url || "");
        }

        // Fetch headers
        const headersResponse = await getHeaders();
        if (headersResponse.success && headersResponse.data) {
          const loadedRows: HeaderRow[] = headersResponse.data.map(
            (header: WebhookHeader) => ({
              id: crypto.randomUUID(),
              key: header.key,
              value: header.value,
              status: "saved" as const,
              originalKey: header.key,
              originalValue: header.value,
            })
          );
          // Add an empty row at the end
          loadedRows.push({
            id: crypto.randomUUID(),
            key: "",
            value: "",
            status: "new",
          });
          setRows(loadedRows);
        }
      } catch (error) {
        console.error("Failed to fetch webhook data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const duplicateKeys = useMemo(() => {
    const keyCounts = new Map<string, number>();
    rows.forEach((row) => {
      if (row.key.trim()) {
        keyCounts.set(row.key, (keyCounts.get(row.key) || 0) + 1);
      }
    });
    return new Set(
      Array.from(keyCounts.entries())
        .filter(([_, count]) => count > 1)
        .map(([key, _]) => key)
    );
  }, [rows]);

  const isUrlValid = useMemo(() => {
    if (!webhookUrl.trim()) return true; // Empty is valid (can clear the webhook)
    try {
      const url = new URL(webhookUrl);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }, [webhookUrl]);

  const hasUrlChanged = useMemo(() => {
    return webhookUrl !== originalUrl;
  }, [webhookUrl, originalUrl]);

  const hasHeaderChanges = useMemo(() => {
    return rows.some((row) => row.status === "new" || row.status === "edited");
  }, [rows]);

  const handleKeyChange = useCallback((id: string, newKey: string) => {
    setRows((prevRows) => {
      const newRows = prevRows.map((row) => {
        if (row.id !== id) return row;

        let newStatus = row.status;
        if (row.originalKey !== undefined && row.originalValue !== undefined) {
          if (newKey === row.originalKey && row.value === row.originalValue) {
            newStatus = "saved";
          } else {
            newStatus = "edited";
          }
        }

        return {
          ...row,
          key: newKey,
          status: newStatus,
        };
      });

      const lastRow = newRows[newRows.length - 1];
      if (
        lastRow.id === id &&
        (newKey.trim() || lastRow.value.trim()) &&
        lastRow.status === "new"
      ) {
        newRows.push({
          id: crypto.randomUUID(),
          key: "",
          value: "",
          status: "new",
        });
      }

      return newRows;
    });
  }, []);

  const handleValueChange = useCallback((id: string, newValue: string) => {
    setRows((prevRows) => {
      const newRows = prevRows.map((row) => {
        if (row.id !== id) return row;

        let newStatus = row.status;
        if (row.originalKey !== undefined && row.originalValue !== undefined) {
          if (row.key === row.originalKey && newValue === row.originalValue) {
            newStatus = "saved";
          } else {
            newStatus = "edited";
          }
        }

        return {
          ...row,
          value: newValue,
          status: newStatus,
        };
      });

      const lastRow = newRows[newRows.length - 1];
      if (
        lastRow.id === id &&
        (newValue.trim() || lastRow.key.trim()) &&
        lastRow.status === "new"
      ) {
        newRows.push({
          id: crypto.randomUUID(),
          key: "",
          value: "",
          status: "new",
        });
      }

      return newRows;
    });
  }, []);

  const handleRemove = useCallback((id: string) => {
    setRows((prevRows) => {
      const filtered = prevRows.filter((row) => row.id !== id);
      if (
        filtered.length === 0 ||
        filtered[filtered.length - 1].key.trim() ||
        filtered[filtered.length - 1].value.trim()
      ) {
        filtered.push({
          id: crypto.randomUUID(),
          key: "",
          value: "",
          status: "new",
        });
      }
      return filtered;
    });
  }, []);

  const handleSave = useCallback(async () => {
    // Validate URL
    if (!isUrlValid) {
      toast.error("Please enter a valid HTTP or HTTPS URL");
      return;
    }

    // Filter out empty rows and prepare headers data
    const itemsToSave = rows
      .filter((row) => row.key.trim() && row.value.trim())
      .map((row) => ({ key: row.key, value: row.value }));

    // Check for duplicate keys
    const keys = itemsToSave.map((item) => item.key);
    const uniqueKeys = new Set(keys);
    if (keys.length !== uniqueKeys.size) {
      toast.error(
        "Cannot save: Duplicate header keys detected. Please remove duplicates."
      );
      return;
    }

    setSaving(true);
    try {
      // Save URL if changed
      if (hasUrlChanged) {
        const configResponse = await updateConfig(webhookUrl);
        if (!configResponse.success) {
          toast.error(
            configResponse.error?.message || "Failed to save webhook URL."
          );
          setSaving(false);
          return;
        }
        setOriginalUrl(webhookUrl);
      }

      // Save headers if changed
      if (hasHeaderChanges) {
        const headersResponse = await bulkUpsertHeaders(itemsToSave);
        if (!headersResponse.success) {
          toast.error(
            headersResponse.error?.message || "Failed to save webhook headers."
          );
          setSaving(false);
          return;
        }
        // Reset all rows to saved state
        setRows([
          ...itemsToSave.map((item) => ({
            id: crypto.randomUUID(),
            key: item.key,
            value: item.value,
            status: "saved" as const,
            originalKey: item.key,
            originalValue: item.value,
          })),
          {
            id: crypto.randomUUID(),
            key: "",
            value: "",
            status: "new" as const,
          },
        ]);
      }

      toast.success("Webhook configuration saved successfully!");
    } catch (error) {
      console.error("Failed to save webhook configuration:", error);
      toast.error("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  }, [webhookUrl, rows, isUrlValid, hasUrlChanged, hasHeaderChanges]);

  const handleFireWebhook = useCallback(async () => {
    setFiring(true);
    try {
      const response = await fireWebhook();
      if (response.success) {
        toast.success("Full sync triggered successfully!");
        setHasFired(true);
      } else {
        toast.error(response.error?.message || "Failed to trigger full sync.");
      }
    } catch (error) {
      console.error("Failed to fire webhook:", error);
      toast.error("An error occurred while triggering the sync.");
    } finally {
      setFiring(false);
    }
  }, []);

  const getCellClassName = useCallback(
    (row: HeaderRow) => {
      if (duplicateKeys.has(row.key) && row.key.trim()) {
        return "border-red-400 dark:border-red-600 bg-red-100 dark:bg-red-900/40 ring-1 ring-red-300 dark:ring-red-700";
      }

      if (row.status === "new" && (row.key.trim() || row.value.trim())) {
        return "border-green-400 dark:border-green-600 bg-green-100 dark:bg-green-900/40";
      }

      if (row.status === "edited") {
        return "border-blue-400 dark:border-blue-600 bg-blue-100 dark:bg-blue-900/40";
      }

      return "";
    },
    [duplicateKeys]
  );

  if (loading) {
    return (
      <RouteGuard permission="webhook:manage" redirectTo="/dashboard">
        <Container>
          <PageTitleWithIcon icon={IconWebhook}>
            Webhook Configuration
          </PageTitleWithIcon>
          <div className="flex items-center justify-center h-96">
            <div className="text-smoke-500">Loading...</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard permission="webhook:manage" redirectTo="/dashboard">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <PageTitleWithIcon icon={IconWebhook}>
            Webhook Configuration
          </PageTitleWithIcon>

          <div className="flex gap-2">
            <Button
              color="primary"
              onClick={() => navigate("/webhook/requests")}
              variant="text"
              iconLeft={IconExternalLink}
            >
              View Requests
            </Button>
            <Button
              color="success"
              onClick={handleSave}
              disabled={saving || !isUrlValid}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {/* Webhook URL Section */}
        <FormCard>
          <div>
            <Input
              label="Webhook URL"
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://example.com/webhook"
              className={
                !isUrlValid && webhookUrl.trim()
                  ? "border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-900/20"
                  : hasUrlChanged
                  ? "border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                  : ""
              }
            />
            {!isUrlValid && webhookUrl.trim() && (
              <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                Please enter a valid HTTP or HTTPS URL
              </p>
            )}
            <p className="mt-1 text-xs text-smoke-500 dark:text-smoke-400">
              This URL will receive POST requests when events occur in the
              system.
            </p>
          </div>
        </FormCard>

        {/* Headers Section */}
        <FormCard>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <IconKey
                size={18}
                className="text-smoke-600 dark:text-smoke-400"
              />
              <label className="text-sm font-semibold text-smoke-700 dark:text-smoke-300">
                Custom Headers
              </label>
            </div>
            <p className="text-xs text-smoke-500 dark:text-smoke-400">
              Add custom headers to include with each webhook request (e.g.,
              Authorization, X-API-Key).
            </p>
          </div>

          <div className="space-y-1.5">
            {/* Header Row */}
            <div className="grid grid-cols-[auto_1fr_2fr] gap-2 px-0.5 mb-2">
              <div className="w-9"></div>
              <div className="text-xs font-semibold text-smoke-600 dark:text-smoke-400 uppercase tracking-wide">
                Key
              </div>
              <div className="text-xs font-semibold text-smoke-600 dark:text-smoke-400 uppercase tracking-wide">
                Value
              </div>
            </div>

            {/* Data Rows */}
            {rows.map((row) => (
              <div
                key={row.id}
                className="grid grid-cols-[auto_1fr_2fr] gap-2 items-center"
              >
                {/* Remove Button */}
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => handleRemove(row.id)}
                    className="p-1.5 rounded-md text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title="Remove row"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>

                {/* Key Input */}
                <Input
                  type="text"
                  value={row.key}
                  onChange={(e) => handleKeyChange(row.id, e.target.value)}
                  placeholder="Header name"
                  className={getCellClassName(row)}
                />

                {/* Value Input */}
                <Input
                  type="text"
                  value={row.value}
                  onChange={(e) => handleValueChange(row.id, e.target.value)}
                  placeholder="Header value"
                  className={getCellClassName(row)}
                />
              </div>
            ))}
          </div>
        </FormCard>

        {/* Full Sync Section */}
        <FormCard color="warning">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-warning-900 dark:text-warning-100 mb-1">
                Full Synchronization
              </h3>
              <p className="text-xs text-warning-700 dark:text-warning-300">
                This will invalidate all cached data and trigger a complete
                revalidation across the system. Use this operation sparingly as
                it may impact performance.
              </p>
            </div>
            <Button
              color="warning"
              onClick={handleFireWebhook}
              disabled={firing || hasFired || !webhookUrl.trim() || !isUrlValid}
            >
              <IconBolt size={18} />
              {firing
                ? "Syncing..."
                : hasFired
                ? "Sync Triggered"
                : "Trigger Full Sync"}
            </Button>
          </div>
        </FormCard>
      </Container>
    </RouteGuard>
  );
};

export default WebhookPage;
