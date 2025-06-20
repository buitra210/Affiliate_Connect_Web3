import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import KOLsDashboard from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher/KOLsDashboard";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const KOLsDashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="KOLs Dashboard | Centic For Project"
        title="KOLs Dashboard | Centic For Project"
        keywords="web3, kols, dashboard"
      />
      <KOLsDashboard />
    </>
  );
};

KOLsDashboardPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default KOLsDashboardPage;
