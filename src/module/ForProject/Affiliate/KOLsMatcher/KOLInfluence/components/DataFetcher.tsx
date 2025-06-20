import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import {
  useAppDispatch,
  useCommonDataSelector,
  useForProjectCommonSelector,
  useKOLsReportSelector,
} from "@centic-scoring/redux/hook";
import { setAccount } from "@centic-scoring/redux/slices/kols-report";
import {
  getKOLsRPMetrics,
  getKOLsRPOverview,
  getKOLsRPPerformance,
  getKOLsRPTweet,
  getKOLsSummary,
} from "@centic-scoring/redux/slices/kols-report/fetchFunctions";
import { useEffect } from "react";

export default function DataFetcher() {
  const dispatch = useAppDispatch();
  const { name } = useKOLsReportSelector();
  const { timeFilter } = useCommonDataSelector();
  const { project } = useForProjectCommonSelector();
  const { id } = useURLQuery();

  useEffect(() => {
    if (project?.data?.social?.twitter?.length) {
      dispatch(setAccount(project?.data?.social?.twitter?.[0].userName));
    }
  }, [project?.data?.social?.twitter, dispatch]);

  useEffect(() => {
    if (id && name) {
      dispatch(getKOLsSummary({ id, name: name }));
    }
  }, [dispatch, id, name]);

  useEffect(() => {
    if (id && name) {
      dispatch(
        getKOLsRPPerformance({
          id,
          name,
          startTime: Math.floor(Number(timeFilter.start) / 1000),
          endTime: Math.floor(Number(timeFilter.end) / 1000),
        })
      );
      dispatch(
        getKOLsRPTweet({
          id,
          name,
          startTime: Math.floor(Number(timeFilter.start) / 1000),
          endTime: Math.floor(Number(timeFilter.end) / 1000),
        })
      );
      dispatch(
        getKOLsRPOverview({
          id,
          name,
          startTime: Math.floor(Number(timeFilter.start) / 1000),
          endTime: Math.floor(Number(timeFilter.end) / 1000),
        })
      );
      dispatch(
        getKOLsRPMetrics({
          id,
          name,
          startTime: Math.floor(Number(timeFilter.start) / 1000),
          endTime: Math.floor(Number(timeFilter.end) / 1000),
        })
      );
    }
  }, [id, name, timeFilter.start, timeFilter.end, dispatch]);

  return null;
}
