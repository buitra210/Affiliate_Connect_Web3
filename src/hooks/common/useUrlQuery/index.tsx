import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";

export default function useURLQuery() {
  const router = useRouter();
  const id = useMemo(() => {
    return String(router.query.id || "");
  }, [router]);
  const campaignId = useMemo(() => {
    return String(router.query.campaignId || "");
  }, [router]);
  const getCustomKey = useCallback(
    (key: string) => {
      return String(router.query![key] || "");
    },
    [router]
  );
  const kolUserName = useMemo(() => {
    return String(router.query.userName || "");
  }, [router]);
  const setCustomKey = useCallback(
    (key: string, value: string) => {
      if (!key) {
        return;
      }
      router.query[key] = value;
      router.push(router, undefined, { shallow: true });
      return router;
    },
    [router]
  );
  const setMultipleKey = useCallback(
    (keys: { [key: string]: string }) => {
      if (!Object.keys(keys)?.length) {
        return;
      }
      Object.entries(keys).forEach(([key, value]) => {
        router.query[key] = value;
      });
      router.push(router, undefined, { shallow: true });
      return router;
    },
    [router]
  );

  return {
    id,
    campaignId,
    kolUserName,
    getCustomKey,
    setCustomKey,
    setMultipleKey,
  };
}
