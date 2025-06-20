import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import Setting from "@centic-scoring/module/Web3Growth/Setting";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

const SettingPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="Setting | Centic For Project"
        title="Setting | Centic For Project"
        keywords="web3, entities, setting"
      />
      <Setting />
    </>
  );
};

SettingPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default SettingPage;
