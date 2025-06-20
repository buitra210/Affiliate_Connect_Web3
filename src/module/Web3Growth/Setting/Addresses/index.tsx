/* eslint-disable no-unused-vars */
import { chainsConfig } from "@centic-scoring/config/chain";
import { useAppSelector } from "@centic-scoring/redux/hook";
import { formatAddress } from "@centic-scoring/utils/string/stringUtils";
import { Add, KeyboardArrowDown, Loop, Search } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Chains } from "../components/Chains";
import { ContractIcon } from "@centic-scoring/icons";
import ComponentWithStatus from "@centic-scoring/components/ComponentWithStatus";
import { AddressSetting } from "@centic-scoring/api/services/web3-growth/setting";
import AddAddress from "../edit-forms/AddAddress";
import DeleteAddress from "./DeleteAddress";
import PermissionComponent from "@centic-scoring/components/PermissionComponent";
import ImportAddresses from "../edit-forms/ImportAddresses";
import EditAddress from "./EditAddress";

export default function Addresses() {
  const { data, status } = useAppSelector((state) => state.setting.address);

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [chainFilter, setChainFilter] = useState<string>("all");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [dAppFilter, setDAppFilter] = useState<string>("All");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleReset() {
    setChainFilter("all");
    setNameFilter("");
    setDAppFilter("All");
  }

  const handleChangeNameFilter = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(ev.target.value);
  };

  const handleChangeChainFilter = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setChainFilter(ev.target.value);
  };

  const handleChangeDAppFilter = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setDAppFilter(ev.target.value);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const dApps = useMemo(() => {
    let result = ["All"] as Array<string>;
    if (data) {
      data.docs.forEach((item) => {
        if (item.dapp != null && !result.includes(item.dapp)) {
          result.push(item.dapp);
        }
      });
    }
    return result;
  }, [data]);

  const chains = useMemo(() => {
    let chainHex = ["all"] as Array<string>;
    let result = [{ id: "all", name: "All" }] as Array<{
      id: string;
      name: string;
      img: string | undefined;
    }>;
    if (data) {
      data.docs.forEach((item) => {
        if (item.chain != null && !chainHex.includes(item.chain)) {
          chainHex.push(item.chain);
        }
      });
      Object.values(chainsConfig).forEach((item) => {
        if (chainHex.includes(item.id)) {
          result.push(item);
        }
      });
    }
    return result;
  }, [data]);

  const checkNameAndTag = (address: AddressSetting) => {
    return (
      address?.name?.toLowerCase()?.includes(nameFilter.toLowerCase()) ||
      Object.values(address?.tags || {}).some((tag) =>
        tag.toLowerCase().includes(nameFilter.toLowerCase())
      )
    );
  };

  const addressesFilter = useMemo(() => {
    if (nameFilter) {
      setPage(0);
    }
    if (data) {
      return data.docs.filter((address) => {
        if (chainFilter == "all" && dAppFilter == "All") {
          return checkNameAndTag(address);
        }
        if (chainFilter == "all") {
          return checkNameAndTag(address) && address.dapp === dAppFilter;
        }
        if (dAppFilter == "All") {
          return checkNameAndTag(address) && address.chain.includes(chainFilter);
        }
        return (
          checkNameAndTag(address) &&
          address.chain.includes(chainFilter) &&
          address.dapp === dAppFilter
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, nameFilter, chainFilter, dAppFilter]);

  const addressesRender = useMemo(() => {
    if (addressesFilter) {
      return addressesFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
  }, [addressesFilter, page, rowsPerPage]);

  return (
    <Paper sx={{ p: 3 }} className="custom-scrollbar">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          Addresses
        </Typography>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Tooltip title="Coming soon" placement="top">
              <AddAddress />
            </Tooltip>
          </Box>
          <IconButton
            sx={{ ml: 0.5 }}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <KeyboardArrowDown
              color="info"
              sx={{
                transform: `rotate(${isOpen ? "180deg" : "0deg"})`,
                transition: "all 0.2s linear",
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={isOpen} sx={{ mx: "-24px" }}>
        <Box>
          <Container
            sx={{
              display: { xs: "block", lg: "flex" },
              justifyContent: "space-between",
              mt: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ display: { xs: "block", md: "none" }, my: 1 }}>
              <Tooltip title="Coming soon" placement="top">
                <Button sx={{ display: "flex" }} variant="outlined">
                  <Add fontSize="small" />
                  <Typography variant="body2">Add DApp</Typography>
                </Button>
              </Tooltip>
            </Box>

            <Box
              sx={{
                display: { xs: "initial", md: "flex" },
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TextField
                sx={{
                  input: {
                    "&::placeholder": {
                      color: "text.active2",
                      fontSize: "14px",
                    },
                  },
                  width: { xs: "100%", md: "30%" },
                }}
                value={nameFilter}
                onChange={handleChangeNameFilter}
                size="small"
                placeholder="Enter Name or Tag"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search fontSize="small" color="info" />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: { xs: "initial", md: "flex" }, alignItems: "center" }}>
                <Box sx={{ display: "flex", alignItems: "center", mr: 2, pt: { xs: 1, md: 0 } }}>
                  <Typography variant="body2" sx={{ color: "#9AA7BA", mr: 0.5 }}>
                    Chain
                  </Typography>
                  <TextField
                    id="select-chain"
                    sx={{
                      ".MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                    value={chainFilter}
                    onChange={handleChangeChainFilter}
                    select
                    defaultValue={chainFilter}
                    size="small"
                  >
                    {chains.map((chain) => (
                      <MenuItem key={chain.id} value={chain.id} sx={{ display: "flex" }}>
                        {chain.img && (
                          <Avatar
                            sx={{ width: 24, height: 24, mr: 0.5 }}
                            src={chain.img}
                            alt={chain.name}
                          />
                        )}

                        <Typography variant="body2" fontWeight={500}>
                          {chain.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", mr: 2, py: 1 }}>
                  <Typography variant="body2" sx={{ color: "#9AA7BA", mr: 0.5 }}>
                    DApp
                  </Typography>
                  <TextField
                    id="select-chain"
                    sx={{
                      ".MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                    value={dAppFilter}
                    onChange={handleChangeDAppFilter}
                    select
                    defaultValue={dAppFilter}
                    size="small"
                  >
                    {dApps.map((dApp) => (
                      <MenuItem key={dApp} value={dApp} sx={{ display: "flex" }}>
                        <Typography variant="body2" fontWeight={500}>
                          {dApp}
                        </Typography>
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#1B2E3D", color: "text.active2" }}
                    size="small"
                    onClick={handleReset}
                  >
                    <Typography variant="small" sx={{ mr: 0.5 }}>
                      Reset
                    </Typography>
                    <Loop fontSize="small" />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
          <ComponentWithStatus
            status={status}
            noData={data?.docs.length === 0 || addressesFilter?.length === 0}
          >
            <TableContainer sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width={"15%"}>Chain</TableCell>
                    <TableCell width={"22%"}>Address</TableCell>
                    <TableCell width={"23%"}>Name</TableCell>
                    <TableCell width={"20%"}>DApp</TableCell>
                    <TableCell>Tags</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {addressesRender &&
                    addressesRender.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Box>
                              <Chains
                                chains={Object.values(chainsConfig).filter(
                                  (chain) => item.chain === chain.id
                                )}
                                isShowName={false}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {item.isContract && <ContractIcon />}
                              <Typography sx={{ fontWeight: 600, ml: 0.5 }}>
                                {formatAddress(item.address)}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{item.name}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography className="text-truncate" sx={{ maxWidth: 200 }}>
                              {item.dapp}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: "flex" }}>
                              {Object.values(item.tags).map((tag, index) => {
                                return (
                                  <Box
                                    key={index}
                                    sx={{
                                      backgroundColor: "#1B2E3D",
                                      px: 1,
                                      py: 1,
                                      borderRadius: "10px",
                                      mr: 1,
                                    }}
                                  >
                                    <Typography
                                      className="text-truncate"
                                      sx={{ maxWidth: "100px" }}
                                      variant="small"
                                      color="text.active2"
                                    >
                                      {tag}
                                    </Typography>
                                  </Box>
                                );
                              })}
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexDirection: { xs: "column-reverse", sm: "unset" },
                px: 3,
              }}
            >
              <ImportAddresses />
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={addressesFilter ? addressesFilter.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </ComponentWithStatus>
        </Box>
      </Collapse>
    </Paper>
  );
}
