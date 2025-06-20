import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function AffiliateLinkProject() {
  const { project } = useForProjectCommonSelector();
  const router = useRouter();

  useEffect(() => {
    const handleAffliteProject = async () => {
      if (project.status === "SUCCESS") {
        try {
          if (!project.data?.id) {
            throw new Error("No project id");
          }
          router.push(
            `/projects/affiliate/${project.data?.id}/kols-matcher?tab=connect&newOffer=&newOfferType=&step=&mode=&offerID=&action=&initOfferId=&activeNotiId=`
          );
        } catch (error) {
          router.push(`/projects`);
        }
      }
    };
    handleAffliteProject();
  }, [project.data?.id, router, project.status]);
  return <></>;
}
