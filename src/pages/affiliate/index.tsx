import KOLLayout from "@centic-scoring/layouts/AffiliateUserLayout";
import { NextPageWithLayout } from "../_app";
import { Meta } from "@centic-scoring/components/Meta";
import Affiliate from "@centic-scoring/module/Affiliate";

const AffiliatePage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="For KOLs | Understand Web3 Project Customers Better"
        title="For KOLs | Understand Web3 Project Customers Better"
        keywords="cdp, affiliate, web3, customer"
      />
      <Affiliate />
    </>
  );
};

AffiliatePage.getLayout = function getLayout(page) {
  return <KOLLayout>{page}</KOLLayout>;
};

export default AffiliatePage;
