// import { fetchApiKey } from "@centic-scoring/api/services";
import { Meta } from "@centic-scoring/components/Meta";
// import { StateStatus } from "@centic-scoring/components/component";
// import { PageContextProvider } from "@centic-scoring/context/page-context";
import AppLayout from "@centic-scoring/layouts/AppLayout";
import Integration from "@centic-scoring/module/Integration";
// import { useEffect, useState } from "react";

export default function IntegrationPage() {
  // const [apiKey, setApiKey] = useState<string>("");
  // const [status, setStatus] = useState<StateStatus>("IDLE");
  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       setStatus("PROCESSING");
  //       const apiKeyData = await fetchApiKey();
  //       setApiKey(apiKeyData.apikey);
  //       setStatus("SUCCESS");
  //     } catch (error) {
  //       setStatus("FAILED");
  //     }
  //   };
  //   fetch();
  // }, []);
  return (
    <AppLayout>
      <Meta title="Integration" description="Integration" />
      {/* <PageContextProvider data={{ apikey: apiKey, status: status }}> */}
      <Integration />
      {/* </PageContextProvider> */}
    </AppLayout>
  );
}
