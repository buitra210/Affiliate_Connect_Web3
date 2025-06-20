import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import AmbassadorDashboard from "@centic-scoring/module/ForProject/Affiliate/AmbassadorMatcher/AmbassadorLeaderboard";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const AmbassadorDashboardPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="Ambassador Dashboard | Centic For Project"
        title="Ambassador Dashboard | Centic For Project"
        keywords="web3, ambassador, dashboard, affiliate"
      />
      <AmbassadorDashboard />
    </>
  );
};

AmbassadorDashboardPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default AmbassadorDashboardPage;
