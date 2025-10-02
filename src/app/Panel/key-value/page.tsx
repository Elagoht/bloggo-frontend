import { IconKey, IconTrash } from "@tabler/icons-react";
import { FC, useState, useMemo, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../../../components/form/Button";
import RouteGuard from "../../../components/guards/RouteGuard";
import Container from "../../../components/layout/Container";
import PageTitleWithIcon from "../../../components/layout/Container/PageTitle";
import {
  getKeyValues,
  bulkUpsertKeyValues,
  KeyValue,
} from "../../../services/keyvalue";

interface KeyValueRow {
  id: string;
  key: string;
  value: string;
  status: "saved" | "new" | "edited";
  originalKey?: string;
  originalValue?: string;
}

const KeyValuePage: FC = () => {
  const [rows, setRows] = useState<KeyValueRow[]>([
    { id: crypto.randomUUID(), key: "", value: "", status: "new" },
  ]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch existing key-values on mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getKeyValues();
        if (response.success && response.data) {
          const loadedRows: KeyValueRow[] = response.data.map((kv: KeyValue) => ({
            id: crypto.randomUUID(),
            key: kv.key,
            value: kv.value,
            status: "saved" as const,
            originalKey: kv.key,
            originalValue: kv.value,
          }));
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
        console.error("Failed to fetch key-values:", error);
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

  const handleKeyChange = useCallback(
    (id: string, newKey: string) => {
      setRows((prevRows) => {
        const newRows = prevRows.map((row) => {
          if (row.id !== id) return row;

          // Determine status based on whether values match originals
          let newStatus = row.status;
          if (row.originalKey !== undefined && row.originalValue !== undefined) {
            // This was a saved row, check if it matches original
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

        // Auto-create new row if this is the last row and now has a key or value
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
    },
    []
  );

  const handleValueChange = useCallback(
    (id: string, newValue: string) => {
      setRows((prevRows) => {
        const newRows = prevRows.map((row) => {
          if (row.id !== id) return row;

          // Determine status based on whether values match originals
          let newStatus = row.status;
          if (row.originalKey !== undefined && row.originalValue !== undefined) {
            // This was a saved row, check if it matches original
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

        // Auto-create new row if this is the last row and now has a key or value
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
    },
    []
  );

  const handleRemove = useCallback((id: string) => {
    setRows((prevRows) => {
      const filtered = prevRows.filter((row) => row.id !== id);
      // Ensure there's always at least one empty row at the end
      if (filtered.length === 0 || filtered[filtered.length - 1].key.trim() || filtered[filtered.length - 1].value.trim()) {
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
    // Filter out empty rows and prepare data for API
    const itemsToSave = rows
      .filter((row) => row.key.trim() && row.value.trim())
      .map((row) => ({ key: row.key, value: row.value }));

    // Check for duplicate keys
    const keys = itemsToSave.map((item) => item.key);
    const uniqueKeys = new Set(keys);
    if (keys.length !== uniqueKeys.size) {
      toast.error("Cannot save: Duplicate keys detected. Please remove duplicates.");
      return;
    }

    setSaving(true);
    try {
      const response = await bulkUpsertKeyValues(itemsToSave);
      if (response.success) {
        // Reset all rows to saved state
        setRows(
          itemsToSave
            .map((item) => ({
              id: crypto.randomUUID(),
              key: item.key,
              value: item.value,
              status: "saved" as const,
              originalKey: item.key,
              originalValue: item.value,
            }))
            .concat([{ id: crypto.randomUUID(), key: "", value: "", status: "new" }])
        );
        toast.success("Key-value pairs saved successfully!");
      } else {
        toast.error(response.error?.message || "Failed to save key-value pairs.");
      }
    } catch (error) {
      console.error("Failed to save key-values:", error);
      toast.error("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  }, [rows]);

  const getRowClassName = useCallback(
    (row: KeyValueRow) => {
      if (row.status === "new" && (row.key.trim() || row.value.trim())) {
        return "bg-green-100 dark:bg-green-800/40";
      }
      if (row.status === "edited") {
        return "bg-blue-100 dark:bg-blue-800/40";
      }
      return "";
    },
    []
  );

  const getKeyCellClassName = useCallback(
    (row: KeyValueRow) => {
      if (duplicateKeys.has(row.key)) {
        return "bg-red-200 dark:bg-red-800/50";
      }
      return "";
    },
    [duplicateKeys]
  );

  if (loading) {
    return (
      <RouteGuard permission="keyvalue:manage" redirectTo="/dashboard">
        <Container>
          <PageTitleWithIcon icon={IconKey}>Key-Value Store</PageTitleWithIcon>
          <div className="flex items-center justify-center h-96">
            <div className="text-smoke-500">Loading...</div>
          </div>
        </Container>
      </RouteGuard>
    );
  }

  return (
    <RouteGuard permission="keyvalue:manage" redirectTo="/dashboard">
      <Container>
        <div className="flex items-center justify-between mb-6">
          <PageTitleWithIcon icon={IconKey}>Key-Value Store</PageTitleWithIcon>

          <Button color="success" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center w-16">

                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left w-1/3">
                  Key
                </th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left w-2/3">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={getRowClassName(row)}>
                  <td className="border border-gray-300 dark:border-gray-700 px-2 py-2 text-center">
                    <button
                      onClick={() => handleRemove(row.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      title="Remove row"
                    >
                      <IconTrash size={18} />
                    </button>
                  </td>
                  <td
                    className={`border border-gray-300 dark:border-gray-700 px-4 py-2 ${getKeyCellClassName(
                      row
                    )}`}
                  >
                    <input
                      type="text"
                      value={row.key}
                      onChange={(e) => handleKeyChange(row.id, e.target.value)}
                      className="w-full border-none outline-none bg-transparent"
                      placeholder="Enter key"
                    />
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <input
                      type="text"
                      value={row.value}
                      onChange={(e) =>
                        handleValueChange(row.id, e.target.value)
                      }
                      className="w-full border-none outline-none bg-transparent"
                      placeholder="Enter value"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </RouteGuard>
  );
};

export default KeyValuePage;
