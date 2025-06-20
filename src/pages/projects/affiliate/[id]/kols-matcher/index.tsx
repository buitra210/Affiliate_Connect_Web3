import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import KOLsMatcher from "@centic-scoring/module/ForProject/Affiliate/KOLsMatcher";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const AffiliatePage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="Affiliate | Centic For Project"
        title="Affiliate | Centic For Project"
        keywords="web3, kols, dashboard, affiliate"
      />
      <KOLsMatcher />
    </>
  );
};

AffiliatePage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default AffiliatePage;
