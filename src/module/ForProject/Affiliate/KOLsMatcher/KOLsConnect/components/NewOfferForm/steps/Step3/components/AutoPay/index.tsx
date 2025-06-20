import { AddIcon, TrashIcon } from "@centic-scoring/icons";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { chainsConfig } from "@centic-scoring/config/chain";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import { usePayShareLogic } from "../usePaySharedLogic";

export default function AutoPay() {
  const { options, offerForm } = useKOLOfferSelector();
  const dispatch = useAppDispatch();

  const {
    handleAddBonus,
    handleDelete,
    handleEdit,
    chain,
    setChain,
    amount,
    setAmount,
    token,
    setToken,
    tokenName,
    setTokenName,
    tokenOptions,
    goalOptions,
    kpiOptions,
    ruleOptions,
    rule,
    setRule,
    bonus,
  } = usePayShareLogic();

  // eslint-disable-next-line no-unused-vars
  const [upfrontPay, setUpfrontPay] = useState<number | undefined>(
    offerForm.payment.rule.upfrontPay
  );
  // eslint-disable-next-line no-unused-vars
  const [postPay, setPostPay] = useState<number | undefined>(offerForm.payment.rule.postPay);

  const updateReduxData = useDebounce(() => {
    dispatch(
      editForm({
        payment: {
          type: "Auto",
          chains: chain,
          amount: Number(amount),
          token,
          tokenName,
          rule: {
            type: rule,
            postPay: postPay,
            upfrontPay: upfrontPay,
          },
          bonus: Object.fromEntries(
            Object.entries(bonus).map(([k, v]) => {
              const newBonus = {
                goal: v.goal || "",
                kpi: {
                  value: v.kpi || 0,
                  type: v.type || "",
                },
                reward: v.reward || 0,
              };
              return [k, newBonus];
            })
          ),
        },
      })
    );
  }, 500);

  useEffect(() => {
    updateReduxData();
  }, [updateReduxData, chain, amount, token, rule, upfrontPay, postPay, bonus]);

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            fullWidth
            label="Chains"
            value={chain}
            onChange={(e) => setChain(e.target.value)}
          >
            {options.payChains?.data?.map((chain) => {
              return (
                <MenuItem key={chain} value={chain}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={chainsConfig[chain].img}
                      sx={{ width: "20px", height: "20px", mr: 1 }}
                    />
                    {chainsConfig[chain].name}
                  </Box>
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Token"
            value={token}
            required
            select
            disabled={chain.length === 0}
            onChange={(e) => {
              setToken(e.target.value);
              setTokenName(tokenOptions.find((token) => token.id === e.target.value)?.name || "");
            }}
          >
            {tokenOptions.map((token) => {
              return (
                <MenuItem value={token.id} key={token.id}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={token.icon} sx={{ width: "20px", height: "20px", mr: 1 }} />
                    {token.name}
                  </Box>
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            value={amount}
            type="number"
            onChange={(e) => {
              setAmount(
                e.target.value || e.target.value === "0" ? Number(e.target.value) : undefined
              );
            }}
            fullWidth
            label={"Amount"}
            required
          />
        </Grid>
      </Grid>
      <Grid container sx={{ mt: 4 }} spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label={"Rule"}
            value={rule}
            onChange={(e) => setRule(e.target.value as any)}
            required
            select
          >
            {ruleOptions.map((r, index) => {
              return (
                <MenuItem key={index} value={r.value}>
                  {r.title}
                </MenuItem>
              );
            })}
          </TextField>
        </Grid>
        {/* {rule === "" && (
          <>
            <Grid item xs={12} sm={3}>
              <TextField
                value={upfrontPay}
                onChange={(e) => {
                  setUpfrontPay(
                    e.target.value || e.target.value === "0" ? Number(e.target.value) : undefined
                  );
                }}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Typography
                      color="text.label1"
                      whiteSpace={"nowrap"}
                      sx={{ pl: 1, borderLeft: "1px solid", borderColor: "", py: 0.4 }}
                    >
                      Upfront pay
                    </Typography>
                  ),
                }}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                value={postPay}
                onChange={(e) =>
                  setPostPay(
                    e.target.value || e.target.value === "0" ? Number(e.target.value) : undefined
                  )
                }
                fullWidth
                InputProps={{
                  endAdornment: (
                    <Typography
                      color="text.label1"
                      whiteSpace={"nowrap"}
                      sx={{ pl: 1, borderLeft: "1px solid", borderColor: "", py: 0.4 }}
                    >
                      Post pay
                    </Typography>
                  ),
                }}
                type="number"
              />
            </Grid>
          </>
        )} */}
      </Grid>
      <Box sx={{ mt: 4 }}>
        <Typography color={"text.label1"} mb={1}>
          Bonus reward
        </Typography>
        {Object.entries(bonus).map(([id, value]) => {
          return (
            <Box key={id} mb={3} sx={{ display: "flex", alignItems: "center" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    value={value.goal || ""}
                    onChange={(e) => {
                      handleEdit(id, { goal: e.target.value });
                    }}
                    fullWidth
                    label={"Goal"}
                    required
                    select
                  >
                    {goalOptions.map((g, index) => {
                      return (
                        <MenuItem key={index} value={g.value}>
                          {g.title}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3.5}>
                  <TextField
                    value={value.kpi}
                    onChange={(e) =>
                      handleEdit(id, {
                        kpi: e.target.value !== undefined ? Number(e.target.value) : undefined,
                      })
                    }
                    fullWidth
                    label={"KPI"}
                    type="number"
                    required
                    InputProps={{
                      endAdornment: (
                        <TextField
                          value={value.type}
                          size="small"
                          select
                          sx={{
                            borderLeft: "1px solid",
                            borderColor: "#313F4C",
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            minWidth: "120px",
                          }}
                          onChange={(e) => {
                            handleEdit(id, {
                              type: e.target.value,
                            });
                          }}
                        >
                          {kpiOptions.map((opt) => {
                            return (
                              <MenuItem key={opt.value} value={opt.value}>
                                {opt.title}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2.5}>
                  <TextField
                    value={value.reward}
                    onChange={(e) =>
                      handleEdit(id, {
                        reward: e.target.value !== undefined ? Number(e.target.value) : undefined,
                      })
                    }
                    fullWidth
                    label={"reward (%)"}
                    required
                    type="number"
                  />
                </Grid>
              </Grid>
              <IconButton
                disableRipple
                onClick={() => {
                  handleDelete(id);
                }}
              >
                <TrashIcon />
              </IconButton>
            </Box>
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={handleAddBonus} variant="outlined" color="info">
            <AddIcon sx={{ mr: 1 }} /> Add Bonus
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
