import { upperCase } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { deepmerge } from "@mui/utils";

export type LocalSettings = {
  recentSearches?: string[];
};

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useProjectName = () => {
  const router = useRouter();
  return useMemo(() => {
    const name = router.query.id;
    return upperCase(String(name || ""));
  }, [router]);
};

export function useLocalSettings() {
  const { data: settings = {}, mutate } = useSWRImmutable<LocalSettings>(
    "user-local-settings",
    () => {
      if (typeof window === "undefined") return {};
      const lsSettings = window.localStorage.getItem("settings");
      if (lsSettings) {
        return JSON.parse(lsSettings);
      }
      return {};
    }
  );

  const updateSettings = useCallback(
    (dataUpdate: Partial<LocalSettings>) => {
      const newSettings = deepmerge({ ...settings }, dataUpdate);
      if (newSettings.recentSearches) {
        // store at most 8 searches
        newSettings.recentSearches = newSettings.recentSearches.slice(0, 8);
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem("settings", JSON.stringify(newSettings));
      }
      mutate(newSettings);
    },
    [mutate, settings]
  );

  const addSearch = useCallback(
    (search: string) => {
      updateSettings({
        recentSearches: [search].concat(
          (settings.recentSearches ?? []).filter((s) => s !== search)
        ),
      });
    },
    [settings.recentSearches, updateSettings]
  );

  const removeSearch = useCallback(
    (search: string) => {
      updateSettings({
        recentSearches: (settings.recentSearches ?? []).filter((s) => s !== search),
      });
    },
    [settings.recentSearches, updateSettings]
  );

  return { settings, updateSettings, addSearch, removeSearch };
}
