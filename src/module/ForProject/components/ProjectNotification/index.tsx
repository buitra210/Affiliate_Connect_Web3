import {
  KOLConnectAPI,
  updateReadAllProject,
} from "@centic-scoring/api/services/affiliate/affiliate";
import Notifications from "@centic-scoring/components/Notifications";
import {
  useAppDispatch,
  useForProjectCommonSelector,
  useKOLOfferSelector,
} from "@centic-scoring/redux/hook";
import {
  getProjectNotification,
  getProjectNotifications,
} from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import useNotificationPolling from "@centic-scoring/hooks/useNotificationPolling";

export default function ProjectNotification() {
  const { project } = useForProjectCommonSelector();
  const dispatch = useAppDispatch();
  const { data, status } = useKOLOfferSelector().projectNotifications;
  const router = useRouter();

  const handleReadAll = async () => {
    try {
      await updateReadAllProject(project.data?.id || "");
      toast.success("All notifications have been read");
      if (project.data?.id) {
        dispatch(getProjectNotifications({ id: project.data.id }));
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const handleRead = async (
    offerId?: string,
    notificationId?: string,
    type?: string,
    read?: boolean
  ) => {
    try {
      if (notificationId && !read) {
        await KOLConnectAPI.updateNotificationStatus(project.data?.id || "", notificationId);
      }
      if (offerId && type) {
        router.push(
          `/projects/affiliate/${
            project.data?.id
          }/kols-matcher?tab=connect&newOffer=&newOfferType=&step=&mode=view&offerID=${offerId}&action=${type.toLowerCase()}`
        );
        dispatch(getProjectNotification({ id: project.data?.id || "", offerId: offerId }));
      }
      if (project.data?.id) {
        dispatch(getProjectNotifications({ id: project.data.id }));
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    if (project.data?.id) {
      dispatch(getProjectNotifications({ id: project.data.id }));
    }
  }, [dispatch, project.data?.id]);

  useNotificationPolling({ role: "Project" });

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
