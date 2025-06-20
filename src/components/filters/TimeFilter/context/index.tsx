import { useAppDispatch, useCommonDataSelector } from "@centic-scoring/redux/hook";
import { editEndTime, editStartTime } from "@centic-scoring/redux/slices/common";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type TimeFilterContextType = {
  startTime: number;
  setStartTime: Dispatch<SetStateAction<number>>;
  endTime: number | undefined;
  setEndTime: Dispatch<SetStateAction<number | undefined>>;
  maxTimeRange: number;
  dayHover: number;
  setDayHover: Dispatch<SetStateAction<number>>;
  handleApply: () => void;
  // eslint-disable-next-line no-unused-vars
  onDayHover: (e: number) => void;
  pointer: boolean;
  setPointer: Dispatch<SetStateAction<boolean>>;
};

export const TimeFilterContext = createContext<TimeFilterContextType>({} as TimeFilterContextType);

export default function TimeFilterContextProvider({ children }: { children: ReactNode }) {
  const { timeFilter } = useCommonDataSelector();
  const [startTime, setStartTime] = useState<number>(timeFilter.start);
  const [endTime, setEndTime] = useState<number | undefined>(timeFilter.end);
  const [dayHover, setDayHover] = useState<number>(0);
  const [pointer, setPointer] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const maxTimeRange = 86400 * 90 * 1000;

  const onDayHover = useCallback(
    (e: number) => {
      setDayHover(e);
    },
    [setDayHover]
  );

  const handleApply = useCallback(() => {
    dispatch(editStartTime(startTime));
    dispatch(editEndTime(endTime));
  }, [dispatch, startTime, endTime]);

  const contextValue: TimeFilterContextType = useMemo(() => {
    return {
      startTime,
      setStartTime,
      endTime,
      setEndTime,
      maxTimeRange,
      handleApply,
      dayHover,
      setDayHover,
      onDayHover,
      pointer,
      setPointer,
    };
  }, [
    startTime,
    endTime,
    maxTimeRange,
    setStartTime,
    setEndTime,
    handleApply,
    dayHover,
    pointer,
    setPointer,
    onDayHover,
  ]);

  return <TimeFilterContext.Provider value={contextValue}>{children}</TimeFilterContext.Provider>;
}

export const useTimeFilterContext = () => useContext(TimeFilterContext);
