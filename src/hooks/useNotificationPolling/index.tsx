import { useAppDispatch, useForProjectCommonSelector } from "@centic-scoring/redux/hook";
import { getProjectNotifications } from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import { getKOLUserNotifications } from "@centic-scoring/redux/slices/kol-user/fetchFuntions";
import { useEffect } from "react";

type Role = "KOL" | "Project" | "Ambassador";
export default function useNotificationPolling({ role }: { role: Role }) {
  const dispatch = useAppDispatch();
  const { project } = useForProjectCommonSelector();

  useEffect(() => {
    const fetchNotifications = () => {
      if (role === "KOL") {
        dispatch(getKOLUserNotifications());
        return;
      }
      if (role === "Project" && project.data?.id) {
        dispatch(getProjectNotifications({ id: project.data.id }));
        return;
      }
    };

    fetchNotifications();

    const intervalId = setInterval(fetchNotifications, 60000);

    // Cleanup interval khi component unmount
    return () => clearInterval(intervalId);
  }, [dispatch, role, project]);

  return null;
}
