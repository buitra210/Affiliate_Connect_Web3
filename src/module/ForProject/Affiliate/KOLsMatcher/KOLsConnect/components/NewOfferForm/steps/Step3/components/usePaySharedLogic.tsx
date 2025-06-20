import { useMemo, useState } from "react";
import { useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { TKOLOffer } from "@centic-scoring/redux/slices/kol-offer";

export type BonusReward = {
  [id: string]: {
    goal: string | undefined;
    kpi: number | undefined;
    type: string | undefined;
    reward: number | undefined;
  };
};

export const usePayShareLogic = () => {
  const { options, offerForm } = useKOLOfferSelector();
  const [bonus, setBonus] = useState<BonusReward>(
    Object.fromEntries(
      Object.entries(offerForm.payment.bonus).map(([k, v]) => {
        return [k, { goal: v.goal, kpi: v.kpi?.value, type: v.kpi?.type, reward: v.reward }];
      })
    )
  );

  const [chain, setChain] = useState<string>(offerForm.payment.chains);
  const [amount, setAmount] = useState<number | undefined>(offerForm.payment.amount);
  const [token, setToken] = useState<string>(offerForm.payment.token);
  const [tokenName, setTokenName] = useState<string>(offerForm.payment.tokenName);
  const [rule, setRule] = useState<TKOLOffer["offerForm"]["payment"]["rule"]["type"]>(
    offerForm.payment.rule.type
  );

  const handleAddBonus = () => {
    const newId = Date.now();
    setBonus((prev) => {
      return {
        ...prev,
        [newId]: {
          goal: "",
          kpi: undefined,
          type: "Per post",
          reward: undefined,
        },
      };
    });
  };
  const handleDelete = (id: string) => {
    setBonus((prev) => {
      let tmp = { ...prev };
      try {
        delete tmp[id];
      } catch (error) {
        //pass
      }
      return tmp;
    });
  };
  const handleEdit = (id: string, payload: Partial<(typeof bonus)[string]>) => {
    setBonus((prev) => {
      return {
        ...prev,
        [id]: {
          ...prev[id],
          ...payload,
        },
      };
    });
  };

  const tokenOptions = useMemo(() => {
    return (
      options?.payTokens?.data?.[chain]?.map((token) => {
        return {
          id: token.address,
          name: String(token.name),
          icon: token.imgUrl,
        };
      }) || []
    );
  }, [chain, options?.payTokens?.data]);

  const goalOptions: { title: string; value: string }[] = [
    {
      title: "Engagement Rate",
      value: "Engagement Rate",
    },
    {
      title: "Impressions",
      value: "Impressions",
    },
    {
      title: "Likes",
      value: "Likes",
    },
    {
      title: "Comments",
      value: "Comments",
    },
    {
      title: "Retweets",
      value: "Retweets",
    },
    {
      title: "Link Clicks",
      value: "Link clicks",
    },
  ];

  const kpiOptions: { title: string; value: string }[] = [
    {
      title: "per post",
      value: "Per post",
    },
    {
      title: "all post",
      value: "All post",
    },
  ];

  const ruleOptions: {
    title: string;
    value: TKOLOffer["offerForm"]["payment"]["rule"]["type"];
  }[] = [
    { value: "Upfront Payment", title: "Totally Upfront Payment" },
    { value: "Post Payment", title: "Post-Completion Payment" },
  ];

  return {
    chain,
    tokenOptions,
    amount,
    setAmount,
    token,
    setToken,
    rule,
    setRule,
    bonus,
    setBonus,
    handleAddBonus,
    handleDelete,
    handleEdit,
    goalOptions,
    kpiOptions,
    ruleOptions,
    tokenName,
    setTokenName,
    setChain,
  };
};
