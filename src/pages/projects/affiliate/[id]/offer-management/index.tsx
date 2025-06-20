import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import OfferManagement from "@centic-scoring/module/ForProject/Affiliate/OfferManagement";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const OfferManagementPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="Offer management | Centic For Project"
        title="Offer management | Centic For Project"
        keywords="web3, kols, dashboard, affiliate"
      />
      <OfferManagement />
    </>
  );
};

OfferManagementPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default OfferManagementPage;
