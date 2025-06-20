import { useForProjectCommonSelector } from "@centic-scoring/redux/hook";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CheckuserProject() {
  const { projectCreated, project } = useForProjectCommonSelector();
  const router = useRouter();
  useEffect(() => {
    if (project.status == "SUCCESS") {
      if (!projectCreated) {
        if (router.asPath !== "/projects") {
          router.push("/projects");
        }
      }
    }
  }, [router, project.status, projectCreated]);
  return null;
}
