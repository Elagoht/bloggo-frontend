import { IconHistory } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BoxHeader from "../../../common/BoxHeader";
import Button from "../../../form/Button";
import AuditLogListItem from "../audit-logs/AuditLogListItem";
import { getAuditLogs } from "../../../../services/audit";
import { getUsers } from "../../../../services/users";

const DashboardAuditLogCard: FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [users, setUsers] = useState<Map<number, UserCard>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch recent audit logs excluding auth events
        const auditResult = await getAuditLogs({
          take: 10,
          order: "created_at",
          dir: "desc",
          entityType: [
            "post",
            "post_version",
            "category",
            "tag",
            "user",
            "removal_request",
            "keyvalue",
          ],
          action: [
            "created",
            "updated",
            "deleted",
            "published",
            "unpublished",
            "approved",
            "rejected",
            "requested",
          ],
        });

        // Fetch users for name mapping
        const usersResult = await getUsers({ take: 1000 });

        if (auditResult.success && auditResult.data) {
          setAuditLogs(auditResult.data.logs);
        }

        if (usersResult.success) {
          const userMap = new Map<number, UserCard>();
          usersResult.data.data.forEach((user) => {
            userMap.set(user.id, user);
          });
          setUsers(userMap);
        }
      } catch (error) {
        console.error("Failed to fetch audit logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-smoke-50 dark:bg-smoke-950 rounded-xl border border-smoke-200/60 dark:border-smoke-700/60 p-4 lg:col-span-2 xl:col-span-3">
      <div className="flex justify-between">
        <BoxHeader
          icon={<IconHistory />}
          title="Recent Activity"
          variant="smoke"
        />

        <Link to="/audit-logs">
          <Button variant="text">View All</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-smoke-400"></div>
        </div>
      ) : !auditLogs || auditLogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8">
          <div className="w-12 h-12 bg-smoke-100 dark:bg-smoke-800 rounded-full grid place-items-center">
            <IconHistory className="size-5 text-smoke-400" />
          </div>
          <small className="text-smoke-500 text-sm">
            No activity recorded yet
          </small>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {auditLogs.map((auditLog) => (
            <AuditLogListItem
              key={auditLog.id}
              auditLog={auditLog}
              users={users}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardAuditLogCard;
