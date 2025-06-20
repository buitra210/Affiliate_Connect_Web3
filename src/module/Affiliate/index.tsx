// import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { Box } from "@mui/material";
import KOLsBanner from "../ForProject/Affiliate/KOLsMatcher/components/KOLsBanner";
import KOLOffers from "./KOL/KOLOffers";

// const tabs: { id: string; value: TTab; title: string }[] = [
//   {
//     id: "audience",
//     value: "KOL",
//     title: "KOL offer",
//   },
//   {
//     id: "report",
//     value: "Ambassador",
//     title: "Ambassdor offer",
//   },
// ];

export type TTab = "KOL" | "Ambassador";
export default function Affiliate() {
  // const { getCustomKey, setCustomKey } = useURLQuery();
  // const currentTab: TTab = (getCustomKey("tab") || "KOL") as TTab;
  return (
    <Box>
      <Box sx={{ px: 2.5 }}>
        <KOLsBanner
          title="Affiliate"
          src="/affiliate/kol-banner.png"
          content="Manage all of your Affiliate Programs."
        />
      </Box>

      {/* <AppTabs
        sx={{
          "& .MuiTabs-flexContainer": {
            justifyContent: "center",
          },
        }}
        value={currentTab}
        onChange={(_, v) => {
          setCustomKey("tab", v);
        }}
        aria-label="campaign detail tabs"
      >
        {tabs.map((item) => (
          <Tab
            key={item.id}
            label={
              <Typography
                variant="body2"
                sx={{
                  color: item.value === currentTab ? "text.active" : "text.active2",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  flex: 1,
                }}
              >
                {item.title}
              </Typography>
            }
            disableRipple
            value={item.value}
            sx={{ flex: 1 }}
          />
        ))}
      </AppTabs> */}
      {/* <Box mt={2}>
        {currentTab === "KOL" && (
          <AuthChecker type="KOL">
            <KOLOffers />
          </AuthChecker>
        )}
        {currentTab === "Ambassador" && (
          <AuthChecker type="Ambassador">
            <OfferTable />
          </AuthChecker>
        )}
      </Box> */}
      <KOLOffers />
    </Box>
  );
}
