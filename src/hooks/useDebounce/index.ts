/* eslint-disable no-unused-vars */
import { DebouncedFunc, debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";

export default function useDebounce(callBack: (input?: any) => void, times: number) {
  const ref = useRef<(input?: any) => void>(callBack);
  useEffect(() => {
    ref.current = callBack;
  }, [callBack]);
  const debouncedCallback: DebouncedFunc<() => void> = useMemo(() => {
    const func = () => {
      ref.current?.();
    };
    return debounce(func, times);
  }, [times]);
  return debouncedCallback;
}
