import { Meta } from "@centic-scoring/components/Meta";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";

import AffiliateOffer from "@centic-scoring/module/Affiliate/KOL/AffiliateOffer/AffiliateOffer";
import { Box } from "@mui/material";
import KOLAuthContextProvider from "@centic-scoring/context/kol-auth-context";
import KOLHeader from "@centic-scoring/layouts/components/AffiliateUserHeader";

const OfferDetailPage: NextPageWithLayout = () => {
  return (
    <>
      <Meta
        description="For KOLs | Understand Web3 Project Customers Better"
        title="For KOLs | Understand Web3 Project Customers Better"
        keywords="cdp, affiliate, web3, customer"
      />
      <AffiliateOffer />
    </>
  );
};

OfferDetailPage.getLayout = function getLayout(page) {
  return (
    <KOLAuthContextProvider>
      <Box
        sx={{
          backgroundColor: "background.primary",
          pt: "78px",
          minHeight: "calc(100vh - 78px)",
        }}
      >
        <KOLHeader />
        {page}
      </Box>
    </KOLAuthContextProvider>
  );
};

export default OfferDetailPage;
