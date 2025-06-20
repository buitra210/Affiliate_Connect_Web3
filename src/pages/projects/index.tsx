import { Meta } from "@centic-scoring/components/Meta";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import ForProject from "@centic-scoring/module/ForProject";
import { NextPageWithLayout } from "../_app";

const ForProjectPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="For Project | Understand Web3 Project Customers Better"
        title="For Project | Understand Web3 Project Customers Better"
        keywords="cdp, customer data platform, web3, customer"
      />
      <ForProject />
    </>
  );
};

ForProjectPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default ForProjectPage;
