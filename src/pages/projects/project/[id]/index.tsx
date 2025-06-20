import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import UserExploreDetail from "@centic-scoring/module/UserExploreDetail";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const ProjectDetailPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="Dashboard | Centic For Project"
        title="Dashboard | Centic For Project"
        keywords="web3, entities, tracking"
      />
      <UserExploreDetail />
    </>
  );
};

ProjectDetailPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default ProjectDetailPage;
