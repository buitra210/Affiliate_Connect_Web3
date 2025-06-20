import { RTProjectData, fetchProjectData } from "@centic-scoring/api/services";
import { Meta } from "@centic-scoring/components/Meta";
import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import NewProject from "@centic-scoring/module/NewProject";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";
import { DataWithStatus } from "@centic-scoring/redux/slices/global";
import { useCallback, useEffect, useState } from "react";

const EditProject: NextPageWithLayout = () => {
  const [projectData, setProjectData] = useState<DataWithStatus<RTProjectData>>({
    status: "IDLE",
    data: {} as RTProjectData,
  });
  const { id } = useURLQuery();

  const fetchInitialData = useCallback(async (id: string) => {
    try {
      setProjectData((prev) => ({ ...prev, status: "PROCESSING" }));
      const res = await fetchProjectData(id);
      setProjectData({ status: "SUCCESS", data: res });
    } catch (error) {
      setProjectData((prev) => ({ ...prev, status: "FAILED" }));
    }
  }, []);

  useEffect(() => {
    fetchInitialData(id);
  }, [fetchInitialData, id]);

  return (
    <>
      <Meta
        description="Edit Project | Centic For Projects"
        title="Edit Project | Centic For Projects"
      />
      <NewProject
        initData={{
          editName: projectData.data?.name,
          editCategory: projectData.data?.category,
          editDescription: projectData.data?.description,
          editVisible: projectData.data?.visible,
          editAvatar: projectData.data?.imgUrl,
        }}
        isEdit
      />
    </>
  );
};

EditProject.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default EditProject;
