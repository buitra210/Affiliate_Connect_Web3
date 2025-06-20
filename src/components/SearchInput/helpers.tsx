import {
  AddressSearchResult,
  CDPSearchResult,
  ProjectSearchResult,
  SearchResult,
  TokenSearchResult,
} from "@centic-scoring/api/services/search-api/types";

import {
  Avatar,
  Box,
  Chip,
  Stack,
  Theme,
  Typography as MuiTypography,
  styled,
} from "@mui/material";
import clsx from "clsx";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import TokenHealthLevel from "../TokenHealthLevel";
import { Link } from "../primitives/Link";

export enum Tab {
  // eslint-disable-next-line no-unused-vars
  ALL = "all",
  // eslint-disable-next-line no-unused-vars
  TOKENS = "tokens",
  // eslint-disable-next-line no-unused-vars
  NFTS = "nfts",
  // eslint-disable-next-line no-unused-vars
  EXCHANGES = "exchanges",
  // eslint-disable-next-line no-unused-vars
  DEFI = "defi",
  // eslint-disable-next-line no-unused-vars
  ADDRESSES = "addresses",
  // eslint-disable-next-line no-unused-vars
  CDP = "cdp",
}

export const id2TabName: { [k: string]: string } = {
  [Tab.ALL]: "All",
  [Tab.CDP]: "Web3 Growth",
  [Tab.TOKENS]: "Tokens",
  [Tab.NFTS]: "NFTs",
  [Tab.EXCHANGES]: "Exchanges",
  [Tab.DEFI]: "DeFi",
  [Tab.ADDRESSES]: "Addresses",
};

export function SearchResultTabs({
  activeTab,
  setActiveTab,
  results,
}: {
  activeTab: Tab;
  setActiveTab: Dispatch<SetStateAction<Tab>>;
  results: SearchResult;
}) {
  return (
    <Stack
      direction={"row"}
      spacing={1}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        pb: 2,
        pt: 1,
        bgcolor: "background.paper",
        overflowX: "auto",
      }}
    >
      {Object.keys(id2TabName).map((id) => {
        if (id == Tab.ALL || results[id as keyof SearchResult].length > 0) {
          return (
            <Chip
              key={id}
              variant="filled"
              clickable
              label={id2TabName[id]}
              className={clsx({ active: activeTab === id })}
              onClick={() => {
                setActiveTab(id as any);
              }}
              sx={(theme: Theme) => ({
                color: "secondary.main",
                height: 26,
                borderRadius: "6px",
                "&.active": {
                  bgcolor: `${theme.palette.secondary.main} !important`,
                  color: `${theme.palette.text.primary} !important`,
                },
              })}
            />
          );
        }
        return null;
      })}
    </Stack>
  );
}

const Typography = styled(MuiTypography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: theme.typography.body2.fontSize,
  },
}));

function SearchItemBox({
  selected,
  link,
  children,
}: PropsWithChildren<{ selected: boolean; link: string }>) {
  return (
    <Link
      href={link}
      style={{ textDecoration: "none" }}
      color={"text.primary"}
      className={clsx({ selected: selected })}
      sx={{
        position: "relative",
        display: "block",
        width: "calc(100% + 24px)",
        px: 3,
        py: 1,
        mx: -3,
        "&:hover": {
          bgcolor: "#12212C",
        },
        "&.selected": {
          bgcolor: "#12212C",
        },
      }}
      // target="_blank"
    >
      {children}
      {selected && (
        <Box
          sx={{
            py: 0.5,
            px: 1,
            display: "flex",
            alignItems: "center",
            position: "absolute",
            right: 0,
            top: 0,
            transform: "translateY(-100%)",
            bgcolor: "#12212C",
          }}
        >
          <Typography mr={1} sx={{ fontSize: "10px", color: "text.tertiary" }}>
            Select
          </Typography>
          {/* <EnterIcon sx={{ fontSize: "1rem", color: "secondary.main" }} /> */}
        </Box>
      )}
    </Link>
  );
}

export function TokenItem({ selected, item }: { selected: boolean; item: TokenSearchResult }) {
  return (
    <SearchItemBox
      selected={selected}
      link={`/portfolio/?entity=${item.id}&type=${item.type}&projectId=${item.projectId || ""}`}
    >
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack direction={"row"} alignItems={"center"} spacing={"10px"}>
          <Avatar
            src={item.imgUrl}
            alt={item.name}
            sx={{ width: 32, height: 32, minWidth: 32, minHeight: 32 }}
          />
          <Typography fontWeight={500}>{item.name}</Typography>
          <Typography fontWeight={300} textTransform={"uppercase"}>
            {item.symbol}
          </Typography>
        </Stack>
        {item.tokenHealth != null && (
          <Stack sx={{ ml: 1 }} direction={"row"} spacing={0.5} alignItems={"center"}>
            <Typography fontWeight={500}>{item.tokenHealth}</Typography>
            <TokenHealthLevel score={item.tokenHealth} sx={{ fontSize: { sm: "large" } }} />
          </Stack>
        )}
      </Stack>
    </SearchItemBox>
  );
}

export function CDPSearchItem({ selected, item }: { selected: boolean; item: CDPSearchResult }) {
  return (
    <SearchItemBox selected={selected} link={`/web3-growth/${item.id}/dapp-snapshot/overview`}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack direction={"row"} alignItems={"center"} spacing={"10px"}>
          <Avatar
            src={item.imgUrl}
            alt={item.name}
            sx={{ width: 32, height: 32, minWidth: 32, minHeight: 32 }}
          />
          <Typography fontWeight={500}>{item.name}</Typography>
        </Stack>
      </Stack>
    </SearchItemBox>
  );
}

export function ProjectSearchItem({
  selected,
  item,
}: {
  selected: boolean;
  item: ProjectSearchResult;
}) {
  return (
    <SearchItemBox
      selected={selected}
      link={`/portfolio/?entity=${item.id}&type=${item.type}&projectType=${
        item.projectType
      }&projectId=${item.projectId || ""}`}
    >
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack direction={"row"} alignItems={"center"} spacing={"10px"}>
          <Avatar
            src={item.imgUrl}
            alt={item.name}
            sx={{ width: 26, height: 26, minWidth: 26, minHeight: 26 }}
          />
          <Typography fontWeight={500}>{item.name}</Typography>
        </Stack>
      </Stack>
    </SearchItemBox>
  );
}

export function AddressSearchItem({
  selected,
  item,
}: {
  selected: boolean;
  item: AddressSearchResult;
}) {
  return (
    <SearchItemBox selected={selected} link={`/portfolio/?entity=${item.id}&type=${item.type}`}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack direction={"row"} spacing={"10px"}>
          <Avatar
            src={item.imgUrl}
            alt={item.name}
            sx={{ width: 26, height: 26, minWidth: 26, minHeight: 26 }}
          />
          <Box>
            <Typography fontWeight={500} mb={0.5}>
              {item.name}
            </Typography>
            <Typography variant="small" color="text.tertiary">
              {item.address}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </SearchItemBox>
  );
}
