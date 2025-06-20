import useDebounce from "@centic-scoring/hooks/useDebounce";
import { AddIcon } from "@centic-scoring/icons";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { setKOLPayment } from "@centic-scoring/redux/slices/affiliate-kol";
import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export type BonusReward = {
  [id: number]: {
    goal: string | undefined;
    kpi: number | undefined;
    type: string | undefined;
    reward: number | undefined;
  };
};

export default function RequestKPIPayment({ paymentId }: { paymentId: number }) {
  const dispatch = useAppDispatch();
  // const [rule, setRule] =
  //   useState<TAffiliateKOL["kolRequest"][number]["payment"][number]["rule"]>("");

  const [payment, setPayment] = useState<{
    rule: string;
    bonusReward: {
      [bonusId: number]: { goal: string; kpiValue: number; kpiType: string; rewardValue: number };
    };
  }>({
    rule: "",
    bonusReward: {
      [Date.now()]: {
        goal: "",
        kpiValue: 0,
        kpiType: "Per post",
        rewardValue: 0,
      },
    },
  });
  const updateReduxState = useDebounce(() => {
    dispatch(
      setKOLPayment({
        id: paymentId,
        content: payment,
      })
    );
  }, 500);
  useEffect(() => {
    updateReduxState();
  }, [payment, updateReduxState, dispatch, paymentId]);

  // eslint-disable-next-line no-unused-vars
  const [bonus, setBonus] = useState<BonusReward>({});

  useEffect(() => {
    setBonus(
      Object.fromEntries(
        Object.entries(payment.bonusReward).map(([id, v]) => [
          Number(id),
          {
            goal: v.goal,
            kpi: v.kpiValue,
            type: v.kpiType,
            reward: v.rewardValue,
          },
        ])
      )
    );
  }, [payment]);

  const goalOptions: { title: string; value: string }[] = [
    { title: "Engagement Rate", value: "Engagement Rate" },
    { title: "Impressions", value: "Impressions" },
    { title: "Likes", value: "Likes" },
    { title: "Comments", value: "Comments" },
    { title: "Retweets", value: "Retweets" },
    { title: "Link Clicks", value: "Link clicks" },
  ];

  const kpiOptions: { title: string; value: string }[] = [
    { title: "per post", value: "Per post" },
    { title: "all post", value: "All post" },
  ];

  const handleAddBonus = () => {
    const newId = Date.now();
    setPayment((prev) => ({
      ...prev,
      bonusReward: {
        ...prev.bonusReward,
        [newId]: {
          goal: "",
          kpiValue: 0,
          kpiType: "Per post",
          rewardValue: 0,
        },
      },
    }));
  };

  const handleDelete = (bonusId: number) => {
    setPayment((prev) => {
      const updated = { ...prev.bonusReward };
      delete updated[bonusId];
      return { rule: prev.rule, bonusReward: updated };
    });
  };

  const handleBonusEdit = (
    id: number,
    payload: Partial<(typeof payment)["bonusReward"][number]>
  ) => {
    setPayment((prev) => ({
      ...prev,
      bonusReward: {
        ...prev.bonusReward,
        [id]: {
          ...prev.bonusReward[id],
          ...payload,
        },
      },
    }));
  };

  // const handleEditRule = (payload: string) => {
  //   setPayment((prev) => ({
  //     ...prev,
  //     rule: payload,
  //   }));
  // };

  return (
    <Box mt={1}>
      {/* <Typography color={"text.label1"} mb={1}>
        Rule
      </Typography>
      <TextField
        fullWidth
        label={"Rule"}
        value={payment.rule || ""}
        onChange={(e) =>
          handleEditRule(e.target.value as "string" | "Upfront Payment" | "Post Payment")
        }
        required
        multiline
        rows={4}
        className="custom-scrollbar"
      /> */}
      <Typography color={"text.label1"} mb={1} mt={2}>
        Bonus reward*
      </Typography>

      <Box>
        {Object.entries(payment.bonusReward).map(([idStr, value]) => {
          const id = Number(idStr);
          return (
            <Box key={id} mb={1} sx={{ alignItems: "center", pt: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={value.goal || ""}
                      onChange={(e) => handleBonusEdit(id, { goal: e.target.value })}
                      fullWidth
                      label={"Goal"}
                      required
                      select
                    >
                      {goalOptions.map((g, index) => (
                        <MenuItem key={index} value={g.value}>
                          {g.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={3.5}>
                    <TextField
                      value={value.kpiValue}
                      onChange={(e) =>
                        handleBonusEdit(id, {
                          kpiValue: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      fullWidth
                      label={"KPI"}
                      type="number"
                      required
                      InputProps={{
                        endAdornment: (
                          <TextField
                            value={value.kpiType}
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
                              handleBonusEdit(id, { kpiType: e.target.value });
                            }}
                          >
                            {kpiOptions.map((opt) => (
                              <MenuItem key={opt.value} value={opt.value}>
                                {opt.title}
                              </MenuItem>
                            ))}
                          </TextField>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2.5}>
                    <TextField
                      value={value.rewardValue}
                      onChange={(e) =>
                        handleBonusEdit(id, {
                          rewardValue: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      fullWidth
                      label={"Reward (%)"}
                      required
                      type="number"
                    />
                  </Grid>
                </Grid>
                <IconButton
                  disableRipple
                  onClick={() => handleDelete(id)}
                  sx={{
                    ml: 2,
                    color: "text.active2",
                  }}
                >
                  <DeleteOutline />
                </IconButton>
              </Box>
            </Box>
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={handleAddBonus} variant="outlined" color="info">
            <AddIcon sx={{ mr: 1 }} /> Add Bonus
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
