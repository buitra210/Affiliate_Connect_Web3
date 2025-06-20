import {
  updateKolUserNotificationStatus,
  updateReadAllKOL,
} from "@centic-scoring/api/services/affiliate/affiliate";
import Notifications from "@centic-scoring/components/Notifications";
import useNotificationPolling from "@centic-scoring/hooks/useNotificationPolling";
import { useAppDispatch, useKolUserSelector } from "@centic-scoring/redux/hook";
import { getKOLUserNotifications } from "@centic-scoring/redux/slices/kol-user/fetchFuntions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function KOLNotification() {
  const dispatch = useAppDispatch();
  const { data, status } = useKolUserSelector().notifications;
  const router = useRouter();

  const handleReadAll = async () => {
    try {
      await updateReadAllKOL();
      toast.success("All notifications have been read");
      dispatch(getKOLUserNotifications());
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  /* eslint-disable no-unused-vars */
  const handleRead = async (offerId?: string, notificationId?: string) => {
    try {
      if (notificationId) {
        await updateKolUserNotificationStatus(notificationId);
      }
      if (offerId) {
        router.push(`/affiliate/offer/${offerId}`);
      }
      dispatch(getKOLUserNotifications());
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    dispatch(getKOLUserNotifications());
  }, [dispatch]);

  useNotificationPolling({ role: "KOL" });

  return (
    <>
      {data && (
        <Notifications
          data={data}
          status={status}
          handleReadAll={handleReadAll}
          handleRead={handleRead}
        />
      )}
    </>
  );
}
