import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import AffiliateLinkProject from "@centic-scoring/module/Affiliate/KOL/AffiliateLinkProject/AffiliateLinkProject";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const AffiliateRedirect: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="Affiliate | Affiliate For Project"
        title="Affiliate | Affiliate For Project"
        keywords="web3, affiliate"
      />
      <AffiliateLinkProject />
    </>
  );
};

AffiliateRedirect.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default AffiliateRedirect;
