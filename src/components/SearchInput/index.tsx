/* eslint-disable no-case-declarations */

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import {
  Box,
  BoxProps,
  Dialog,
  DialogContent,
  DialogTitle,
  Hidden,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
  debounce,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AddressSearchItem,
  CDPSearchItem,
  ProjectSearchItem,
  SearchResultTabs,
  Tab,
  TokenItem,
  id2TabName,
} from "./helpers";
import { useLocalSettings } from "@centic-scoring/hooks";
import useSWRImmutable from "swr/immutable";
import { KeyedMutator } from "swr";
import {
  AddressSearchResult,
  CDPSearchResult,
  ProjectSearchResult,
  SearchResult,
  TokenSearchResult,
} from "@centic-scoring/api/services/search-api/types";
import { useAppSelector } from "@centic-scoring/redux/hook";
import { fetchSearchResults } from "@centic-scoring/api/services/search-api";
import { EnterIcon } from "@centic-scoring/icons";
import SearchIcon from "@mui/icons-material/Search";
import CenticLoading from "../CenticLoading";
import { bugReportUrl } from "@centic-scoring/config/defaultConst";

function useSearchDialogOpenStatus(): [boolean, KeyedMutator<boolean>] {
  const { data, mutate } = useSWRImmutable<boolean>("search-dialog-open-status", {
    fallbackData: false,
  });
  return [data ?? false, mutate];
}

export function RecentSearchList() {
  const [, setOpenSearch] = useSearchDialogOpenStatus();
  const { settings, addSearch, removeSearch } = useLocalSettings();
  const recentSearches = settings.recentSearches ?? [];

  return (
    <List component="div">
      {recentSearches.map((item) => (
        <ListItem
          key={item}
          sx={{
            cursor: "pointer",
            color: "text.secondary",
            position: "relative",
            ".close-icon": {
              display: "none",
            },
            "&:hover": {
              bgcolor: "background.hover",
              ".close-icon": {
                display: "inline-block",
              },
            },
          }}
          onClick={() => {
            setOpenSearch(false);
            window.location.replace(`/search?q=${item}`);
            addSearch(item);
          }}
        >
          <HistoryIcon sx={{ mr: 1 }} fontSize="small" />
          <span>{item}</span>
          <IconButton
            size="small"
            onClick={(ev) => {
              ev.preventDefault();
              ev.stopPropagation();
              removeSearch(item);
            }}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translate(-20%, -50%)",
              "&:hover": {
                color: "text.primary",
              },
              color: "inherit",
            }}
          >
            <CloseIcon className="close-icon" fontSize="small" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
}

const InstructionSymbolBox = styled("span")(({ theme }) => ({
  backgroundColor: "#12212C",
  padding: theme.spacing(0.5),
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
}));

/**
 * Calculate the offset top of the target element `el` relative to its ancestor `container`.
 * @param el target element.
 * @param container element that contains target element `el`.
 * @returns `number`.
 * */
const getElementOffsetTop = (el: HTMLElement, container: HTMLElement): number => {
  if (el && el !== container) {
    if (!el.parentElement) {
      throw new Error("target element is not inside contained element");
    }
    return (
      el.getBoundingClientRect().top -
      el.parentElement.getBoundingClientRect().top +
      getElementOffsetTop(el.parentElement, container)
    );
  } else {
    return 0;
  }
};

function SearchDialog() {
  const router = useRouter();

  const [openSearch, setOpenSearch] = useSearchDialogOpenStatus();
  const trendingTokens = useAppSelector((state) => state.recommendation?.tokens.data);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [searchContentScrollableRefEl, setSearchContentScrollableRefEl] =
    useState<HTMLElement | null>(null);
  const [searchContentRefEl, setSearchContentRefEl] = useState<HTMLElement | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ALL);

  const searchIds = useMemo(() => {
    if (results) {
      let ids: string[] = [];
      [Tab.CDP, Tab.TOKENS, Tab.NFTS, Tab.EXCHANGES, Tab.DEFI, Tab.ADDRESSES].forEach((key) => {
        if (activeTab === Tab.ALL || activeTab === key) {
          ids = ids.concat(results[key as keyof SearchResult].map((item) => `${key}@${item.id}`));
        }
      });
      return ids;
    }
    if (trendingTokens) {
      return trendingTokens.map((item) => `tokens@${item.id}`);
    }
    return [];
  }, [activeTab, results, trendingTokens]);

  const handleInpChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value) {
      setLoading(true);
      // reset selected value to avoid user pressing enter while search process
      // is not yet completed
      setSelected(null);
    }
    setSearch(ev.target.value);
  };

  const handleCloseDialog = () => {
    setOpenSearch(false);
    setSearch("");
  };

  useEffect(() => {
    if (searchIds.length) {
      setSelected(searchIds[0]);
    } else {
      setSelected(null);
    }
  }, [searchIds]);

  useEffect(() => {
    const handleNavigate = (ev: KeyboardEvent) => {
      if (ev.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
      const currentIndex = searchIds.findIndex((item) => item === selected);
      switch (ev.key) {
        case "ArrowDown":
          selected && setSelected(searchIds[(currentIndex + 1) % searchIds.length]);
          break;
        case "ArrowUp":
          selected &&
            setSelected(searchIds[(searchIds.length + currentIndex - 1) % searchIds.length]);
          break;
        case "Enter":
          if (selected && searchContentRefEl) {
            const linkEl = searchContentRefEl.querySelector(`[data-id="${selected}"] a`);
            if (linkEl && linkEl.getAttribute("href")) {
              router.push(linkEl.getAttribute("href") as string);
            }
          }
          break;
        // case 'Escape':
        //   handleCloseDialog();
        //   break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleNavigate);
    return () => {
      window.removeEventListener("keydown", handleNavigate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results, searchIds, selected, searchContentRefEl]);

  useEffect(() => {
    if (searchContentRefEl && searchContentScrollableRefEl) {
      const el = searchContentRefEl.querySelector(`[data-id="${selected}"]`);
      if (el) {
        const top =
          getElementOffsetTop(el as HTMLElement, searchContentRefEl) -
          searchContentScrollableRefEl.scrollTop;
        if (
          top > 50 &&
          top + el.getBoundingClientRect().height <
            searchContentScrollableRefEl.getBoundingClientRect().height - 50
        ) {
          return;
        }
        el.scrollIntoView({ block: "center" });
      }
    }
  }, [selected, searchContentRefEl, searchContentScrollableRefEl]);

  const handleSearch = useRef(
    debounce(async (search: string) => {
      try {
        setLoading(true);
        // reset selected value to avoid user pressing enter while search process
        // is not yet completed
        setSelected(null);
        const res = await fetchSearchResults({ keyword: search });
        setResults(res.results);
      } catch (error) {
        // pass
      } finally {
        setLoading(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      setResults(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const handleRouteChange = () => {
      handleCloseDialog();
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={openSearch}
      maxWidth="sm"
      fullWidth
      onClose={handleCloseDialog}
      PaperProps={{
        elevation: 0,
        sx: {
          maxHeight: 500,
          height: "--webkit-fill-available",
          boxShadow: "-4px -4px 8px 0px rgba(0, 159, 219, 0.50)",
          top: "10%",
        },
      }}
      sx={{
        ".MuiDialog-container": {
          alignItems: "baseline",
        },
      }}
    >
      <DialogTitle component={"div"}>
        <Stack direction={"row"} spacing={2} alignItems={"center"} mr={-1}>
          <Box sx={{ flexGrow: 1 }}>
            <TextField
              value={search}
              onChange={handleInpChange}
              variant="outlined"
              autoComplete="off"
              size="small"
              sx={{
                ".MuiOutlinedInput-root": {
                  bgcolor: "background.default",
                  ".MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  ".MuiOutlinedInput-input": {
                    padding: "12px 50px 12px 8px",
                    transition: "all 250ms ease-in-out",
                    borderRadius: 0,
                    fontWeight: 500,
                    "::placeholder": {
                      fontWeight: 500,
                    },
                  },

                  "&.Mui-focused": {
                    ".MuiOutlinedInput-input": {
                      textIndent: "4px",
                    },
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: "#5D84A7" }}>
                    <SearchIcon strokeWidth={2} fontSize="small" />
                  </InputAdornment>
                ),
              }}
              fullWidth
              inputProps={{
                autoFocus: true,
              }}
              placeholder="Track any wallet address, ENS or entity name"
            />
          </Box>
          <Box
            component="span"
            sx={{
              cursor: "pointer",
              transition: "250ms color ease",
            }}
          >
            <IconButton
              onClick={handleCloseDialog}
              size="small"
              sx={{
                color: "#5D84A7",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent
        sx={{ px: 3, py: 0 }}
        className="custom-scrollbar"
        ref={setSearchContentScrollableRefEl}
      >
        {loading && (
          <Box textAlign={"center"} py={5}>
            <CenticLoading title="Searching..." showTitle />
          </Box>
        )}
        {!loading && (
          <>
            {results != null && searchIds.length === 0 && (
              <Box py={4}>
                <Typography variant="h2" pb={2} mb={2}>
                  Search not <b>found</b>
                </Typography>
                {search && (
                  <Typography color="text.secondary" mb={1} sx={{ wordBreak: "break-all" }}>
                    Oops! The search string you entered was: &#34;<b>{search}</b>&#34;
                  </Typography>
                )}
                <Typography color="text.secondary">
                  If you think this is a problem with us, please{" "}
                  <Link href={bugReportUrl} target="_blank" rel="nofollow" underline="hover">
                    tell us
                  </Link>
                  .
                </Typography>
              </Box>
            )}
            {results != null && searchIds.length > 0 && (
              <>
                <Box ref={setSearchContentRefEl}>
                  <SearchResultTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    results={results}
                  />
                  <Box
                    sx={{
                      ">*": {
                        borderTop: "1px solid",
                        borderTopColor: "divider",
                        pt: 1.5,
                      },
                    }}
                  >
                    {[Tab.CDP, Tab.TOKENS, Tab.NFTS, Tab.EXCHANGES, Tab.DEFI, Tab.ADDRESSES].map(
                      (k) => {
                        if (activeTab === "all" || activeTab === k) {
                          const list = results[k as keyof SearchResult];
                          if (list.length > 0) {
                            return (
                              <Box key={k}>
                                <Typography color="text.tertiary" variant="small" fontWeight={600}>
                                  {id2TabName[k]}
                                </Typography>
                                <List>
                                  {list.map((item) => (
                                    <ListItem
                                      key={item.id}
                                      sx={{ p: 0, my: 2 }}
                                      data-id={`${k}@${item.id}`}
                                    >
                                      {k === Tab.TOKENS && (
                                        <TokenItem
                                          item={item as TokenSearchResult}
                                          selected={selected === `${k}@${item.id}`}
                                        />
                                      )}
                                      {(k === Tab.NFTS ||
                                        k === Tab.EXCHANGES ||
                                        k === Tab.DEFI) && (
                                        <ProjectSearchItem
                                          item={item as ProjectSearchResult}
                                          selected={selected === `${k}@${item.id}`}
                                        />
                                      )}
                                      {k === Tab.ADDRESSES && (
                                        <AddressSearchItem
                                          item={item as AddressSearchResult}
                                          selected={selected === `${k}@${item.id}`}
                                        />
                                      )}
                                      {k === Tab.CDP && (
                                        <CDPSearchItem
                                          item={item as CDPSearchResult}
                                          selected={selected === `${k}@${item.id}`}
                                        />
                                      )}
                                    </ListItem>
                                  ))}
                                </List>
                              </Box>
                            );
                          }
                        }
                      }
                    )}
                  </Box>
                </Box>
              </>
            )}
            {results == null && trendingTokens && searchIds.length > 0 && (
              <Box ref={setSearchContentRefEl}>
                <Box>
                  <Typography color="text.tertiary" variant="small" fontWeight={600}>
                    Trending
                  </Typography>
                  <List sx={{ ml: -3 }}>
                    {trendingTokens.map((item) => (
                      <ListItem key={item.id} sx={{ p: 0 }} data-id={`tokens@${item.id}`}>
                        <TokenItem
                          item={item as unknown as TokenSearchResult}
                          selected={selected === `tokens@${item.id}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
            )}
            {searchIds.length > 0 && (
              <Box
                sx={{
                  mx: -3,
                  px: 3,
                  py: 1.5,
                  display: { xs: "none", sm: "block" },
                  position: "sticky",
                  bottom: 0,
                  borderTop: "1px solid",
                  borderTopColor: "divider",
                  bgcolor: "background.paper",
                }}
              >
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <InstructionSymbolBox>
                      <ArrowUpwardIcon color="secondary" sx={{ fontSize: "1rem" }} />
                    </InstructionSymbolBox>
                    <InstructionSymbolBox>
                      <ArrowUpwardIcon
                        color="secondary"
                        sx={{ transform: "rotate(180deg)", fontSize: "1rem" }}
                      />
                    </InstructionSymbolBox>
                    <Typography color="text.secondary" variant="small" fontWeight={500}>
                      To Navigate
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <InstructionSymbolBox>
                      <Typography color="secondary.main" variant="small" fontWeight={500}>
                        ESC
                      </Typography>
                    </InstructionSymbolBox>
                    <Typography color="text.secondary" variant="small" fontWeight={500}>
                      To Cancel
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <InstructionSymbolBox>
                      <EnterIcon color="secondary" sx={{ fontSize: "1rem" }} />
                    </InstructionSymbolBox>
                    <Typography color="text.secondary" variant="small" fontWeight={500}>
                      To Enter
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function SearchInputButton(props: BoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        bgcolor: "background.paper",
        width: "100%",
        height: 48,
        px: 2,
        cursor: "pointer",
        transition: "background-color 250ms ease-in-out",
        "&:hover": {
          bgcolor: "background.secondary",
        },
      }}
      {...props}
    >
      <SearchIcon fontSize="small" sx={{ mr: 2 }} color="secondary" />
      <Typography
        variant="body2"
        fontWeight={500}
        color="secondary.main"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          lineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        Track any wallet address, ENS or entity name
      </Typography>
    </Box>
  );
}

export default function SearchInput({ icon }: { icon?: React.ReactNode }) {
  const [, setOpenSearch] = useSearchDialogOpenStatus();

  return (
    <>
      <Hidden smDown implementation="css">
        <SearchInputButton id="centic-entity-search-btn" onClick={() => setOpenSearch(true)} />
      </Hidden>
      <Hidden smUp implementation="css">
        <IconButton
          onClick={() => setOpenSearch(true)}
          sx={{
            color: "secondary.main",
          }}
        >
          {icon ? icon : <SearchIcon fontSize="small" />}
        </IconButton>
      </Hidden>
      <SearchDialog />
    </>
  );
}
