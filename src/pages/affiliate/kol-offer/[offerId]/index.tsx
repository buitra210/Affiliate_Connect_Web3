import KOLLayout from "@centic-scoring/layouts/AffiliateUserLayout";
import { Meta } from "@centic-scoring/components/Meta";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";
import OfferDetail from "@centic-scoring/module/Affiliate/KOL/OfferDetail";

const OfferDetailPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="For KOLs | Understand Web3 Project Customers Better"
        title="For KOLs | Understand Web3 Project Customers Better"
        keywords="cdp, affiliate, web3, customer"
      />
      <OfferDetail />
    </>
  );
};

OfferDetailPage.getLayout = function getLayout(page) {
  return <KOLLayout>{page}</KOLLayout>;
};

export default OfferDetailPage;
