/* eslint-disable no-unused-vars */
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useCallback } from "react";

enum KEYS {
  newOffer = "newOffer",
  newOfferType = "newOfferType",
  step = "step",
  mode = "mode",
  offerID = "offerID",
  action = "action",
  initOfferId = "initOfferId",
  activeNotiId = "activeNotiId",
}

export default function useKOLsConnectparams() {
  const { setCustomKey, getCustomKey, setMultipleKey } = useURLQuery();

  const getParams = useCallback(
    (key: keyof typeof KEYS) => {
      return getCustomKey(KEYS[key]);
    },
    [getCustomKey]
  );
  const setParams = useCallback(
    (key: keyof typeof KEYS, value: string) => {
      setCustomKey(KEYS[key], value);
    },
    [setCustomKey]
  );
  const setMultipleParams = useCallback(
    (keys: { [key in KEYS]?: string }) => {
      setMultipleKey(keys);
    },
    [setMultipleKey]
  );
  const removeParams = useCallback(
    (key: keyof typeof KEYS) => {
      setParams(key, "");
    },
    [setParams]
  );

  const setStep = useCallback(
    (newStep: number) => {
      setParams("step", String(newStep));
    },
    [setParams]
  );

  const setMode = useCallback(
    (mode: "view" | "editable") => {
      setParams("mode", mode);
    },
    [setParams]
  );

  const resetParam = useCallback(() => {
    Object.keys(KEYS).forEach((key) => {
      removeParams(key as keyof typeof KEYS);
    });
  }, [removeParams]);

  const newOffer = Boolean(getParams("newOffer"));
  const newOfferType = getParams("newOfferType");
  const step = Number(getParams("step") || 1);
  const mode = (getParams("mode") || "view") as "view" | "editable";
  const offerID = getParams("offerID");
  const action = getParams("action");
  const initOfferId = getParams("initOfferId");
  const activeNotiId = getParams("activeNotiId");

  return {
    getParams,
    setParams,
    newOffer,
    newOfferType,
    step,
    removeParams,
    setStep,
    mode,
    setMode,
    offerID,
    resetParam,
    action,
    setMultipleParams,
    initOfferId,
    activeNotiId,
  };
}
