import { useCommonDataSelector } from "@centic-scoring/redux/hook";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DataChecker({ type }: { type: "token" | "dapp" }) {
  const router = useRouter();
  const { projectConfig } = useCommonDataSelector();

  useEffect(() => {
    if (projectConfig.status === "SUCCESS" && !projectConfig.data?.web3GrowthData) {
      if (type === "dapp" && projectConfig.data?.dapps?.length) {
        const dapp = projectConfig.data?.dapps[0];
        router.push(
          `/portfolio?entity=${dapp.id}&type=${dapp.type}${
            dapp.projectType ? `&projectType=${dapp.projectType}` : ""
          }&projectId=${projectConfig.data?.id}`
        );
        return;
      }
      if (type === "token" && projectConfig.data?.tokens?.length) {
        const token = projectConfig.data?.tokens[0];
        router.push(`/portfolio?entity=${token.id}&type=token&projectId=${projectConfig.data?.id}`);
        return;
      }
    } else {
      return;
    }
  }, [projectConfig, router, type]);
  return null;
}
