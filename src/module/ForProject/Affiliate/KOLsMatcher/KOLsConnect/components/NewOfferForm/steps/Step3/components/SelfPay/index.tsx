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
import { editForm, TKOLOffer } from "@centic-scoring/redux/slices/kol-offer";
import useDebounce from "@centic-scoring/hooks/useDebounce";
import { usePayShareLogic } from "../usePaySharedLogic";

export default function SelfPay() {
  const { options, offerForm } = useKOLOfferSelector();
  const {
    handleAddBonus,
    handleDelete,
    handleEdit,
    bonus,
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
  } = usePayShareLogic();

  const dispatch = useAppDispatch();

  const [rule, setRule] = useState<TKOLOffer["offerForm"]["payment"]["rule"]["stringValue"]>(
    offerForm.payment.rule.stringValue || ""
  );

  const updateReduxData = useDebounce(() => {
    dispatch(
      editForm({
        payment: {
          type: "Selfpay",
          chains: chain,
          amount: Number(amount),
          token,
          tokenName,
          rule: {
            type: "string",
            stringValue: rule,
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
  }, [updateReduxData, chain, amount, token, rule, bonus]);

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
            required
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
            value={amount || ""}
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

      <TextField
        sx={{ mt: 4 }}
        fullWidth
        label={"Rule"}
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        required
        multiline
        rows={4}
        className="custom-scrollbar"
        placeholder="E.g: This payment will be applied after you having done all your kpis"
      />

      <Box sx={{ mt: 4 }}>
        <Typography color={"text.label1"} mb={1}>
          Bonus reward
        </Typography>
        {Object.entries(bonus).map(([id, value]) => {
          return (
            <Box key={id} mb={3} sx={{ display: "flex", alignItems: "center" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
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
                <Grid item xs={12} sm={4.5}>
                  <TextField
                    value={value.kpi || ""}
                    onChange={(e) =>
                      handleEdit(id, {
                        kpi: e.target.value !== undefined ? Number(e.target.value) : undefined,
                      })
                    }
                    fullWidth
                    label={"KPI"}
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
                    value={value.reward || ""}
                    onChange={(e) =>
                      handleEdit(id, {
                        reward: e.target.value !== undefined ? Number(e.target.value) : undefined,
                      })
                    }
                    fullWidth
                    label={"Reward (%)"}
                    required
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
