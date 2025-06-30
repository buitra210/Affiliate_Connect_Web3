import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";

const AffiliateIndexPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Redirect to kols-matcher as default page
      router.replace(`/projects/affiliate/${id}/kols-matcher`);
    }
  }, [id, router]);

  return null; // Component will redirect immediately
};

AffiliateIndexPage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default AffiliateIndexPage;
