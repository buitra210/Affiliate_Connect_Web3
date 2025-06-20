import { initOffer } from "@centic-scoring/api/services/affiliate/affiliate";
import CenticLoading from "@centic-scoring/components/CenticLoading";
import { StateStatus } from "@centic-scoring/components/component";
import Failed from "@centic-scoring/components/Failed";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAffiliateAuthSelector } from "@centic-scoring/redux/hook";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";

export default function AffiliateOffer() {
  const [loading, setLoading] = useState<StateStatus>("IDLE");
  const { getCustomKey } = useURLQuery();
  const { isLoggedIn } = useAffiliateAuthSelector();
  const baseOfferId = String(getCustomKey("baseOfferId"));
  const router = useRouter();

  const handleNewoffer = useCallback(async () => {
    setLoading("PROCESSING");
    try {
      if (!baseOfferId) {
        throw new Error("No base offer id");
      }
      const res = await initOffer({ baseOfferId });
      if (res.offerType === "Ambassador") {
        router.push(`/affiliate/ambassador-offer/${res.offerId}`);
        return;
      }
      if (res.offerType === "Kol") {
        router.push(`/affiliate/kol-offer/${res.offerId}`);
        return;
      }
      router.push("/affiliate");
      setLoading("SUCCESS");
    } catch (error) {
      setLoading("FAILED");
    }
  }, [baseOfferId, router]);

  useEffect(() => {
    if (isLoggedIn) {
      handleNewoffer();
    }
  }, [handleNewoffer, isLoggedIn]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "700px",
      }}
    >
      {loading === "PROCESSING" && <CenticLoading />}
      {loading === "FAILED" && (
        <>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Failed title="Some thing went wrong" />
          </Box>
        </>
      )}
    </Box>
  );
}
