import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import NewProject from "@centic-scoring/module/NewProject";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const CreateprojectPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="Create Project | Centic For Project"
        title="Create Project | Centic For Project"
      />
      <NewProject isForProject />
    </>
  );
};

CreateprojectPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default CreateprojectPage;
