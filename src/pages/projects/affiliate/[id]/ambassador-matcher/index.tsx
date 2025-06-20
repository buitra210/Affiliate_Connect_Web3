import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import AmbassadorMatcher from "@centic-scoring/module/ForProject/Affiliate/AmbassadorMatcher";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const AmbassadorMatcherPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="Affiliate | Centic For Project"
        title="Affiliate | Centic For Project"
        keywords="web3, ambassador, dashboard, affiliate"
      />
      <AmbassadorMatcher />
    </>
  );
};

AmbassadorMatcherPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default AmbassadorMatcherPage;
