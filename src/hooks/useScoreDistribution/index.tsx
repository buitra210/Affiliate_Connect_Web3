import {
  GIEntityType,
  GIMethods,
  GIScoreModel,
  ScoreFormula,
  ScoreType,
} from "@centic-scoring/api/api";
import { useEffect, useMemo, useState } from "react";
import {
  ParamsScoreDisReturnType,
  RTPageRankDis,
  getPageRankistribution,
  getTokenScorParams,
  getWalletScoreParam,
} from "@centic-scoring/api/services";
import { useRouter } from "next/router";
import getScoreOrder, { getScoreCardParamOrder } from "@centic-scoring/utils/score";
import { ModelDetail } from "@centic-scoring/context/score-context";
import { StateStatus } from "@centic-scoring/components/component";
import { scoreDistributionToken, scoreDistributionWallet } from "@centic-scoring/constant";

const gap = 50;
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function useScoreDistribution({
  scoreFormula,
  type,
}: {
  scoreFormula: ScoreFormula;
  type?: string | undefined;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  const [scoreParam, setScoreParam] = useState<Array<Array<number>>>([]);

  const router = useRouter();
  const scoreType: ScoreType = useMemo(() => {
    return (type || router.query.type || "Wallet Score") as ScoreType;
  }, [router.query.type, type]);

  useEffect(() => {
    const fetchData = async () => {
      let scoreParamDis: ParamsScoreDisReturnType = {
        numberOfSamples: 0,
        params: [],
      } as any;
      try {
        setLoading(true);
        if (scoreType === "Wallet Score") {
          scoreParamDis = await getWalletScoreParam(2000, 10);
        }
        if (scoreType === "Token Score") {
          scoreParamDis = await getTokenScorParams();
          await sleep(800);
        }
        setScoreParam(scoreParamDis?.params || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, [scoreType]);

  const scoreDistribution = useMemo(() => {
    const paramsOrder = getScoreOrder(scoreType);
    const res = scoreParam
      .map((item) => {
        return item.reduce((result, currentItem, index) => {
          return Math.floor(result + (Number(scoreFormula[paramsOrder[index]]) || 0) * currentItem);
        }, 0);
      })
      .sort();
    let i = 300 / gap;
    let j = 0;
    let plotData: Array<number> = [];
    let plotCategory: Array<string> = [];
    while (i * gap < 850) {
      let count = 0;
      while (res[j] < (i + 1) * gap) {
        count += 1;
        j += 1;
      }
      plotData.push(count);
      plotCategory.push(`${i * gap}-${(i + 1) * gap}`.toString());
      i++;
    }
    return {
      plotData,
      plotCategory,
    };
  }, [scoreFormula, scoreParam, scoreType]);

  return {
    scoreParam,
    loading,
    scoreDistribution,
  };
}

export function useScoreDistributionV2({
  method,
  model,
  modelDetail,
  scoreId,
  entityType = "All",
}: {
  modelDetail: ModelDetail;
  model?: GIScoreModel;
  method?: GIMethods;
  scoreId?: string;
  entityType?: GIEntityType;
}) {
  const [status, setStatus] = useState<StateStatus>("IDLE");
  const [scoreParam, setScoreParam] = useState<Array<Array<number>>>([]);
  const [pageRankData, setPageRankData] = useState<RTPageRankDis>({} as RTPageRankDis);
  const [info, setInfo] = useState<string>();
  useEffect(() => {
    //fetch score param
    const fetchData = async () => {
      let scoreParamDis: ParamsScoreDisReturnType = {
        numberOfSamples: 0,
        params: [],
      };
      switch (method) {
        case "ScoreCard":
          try {
            setStatus("PROCESSING");
            if (model === "Credit Score") {
              scoreParamDis = await getWalletScoreParam(2000, 10);
              setInfo(scoreDistributionWallet);
            }
            if (model === "Token Health") {
              scoreParamDis = await getTokenScorParams();
              await sleep(800);
              setInfo(scoreDistributionToken);
            }
            setScoreParam(scoreParamDis?.params || []);
            setStatus("SUCCESS");
          } catch (error) {
            setStatus("FAILED");
          }
          break;
        case "PageRank":
          try {
            setStatus("PROCESSING");
            const res = await getPageRankistribution(scoreId, entityType);
            setPageRankData(res);
            setInfo(res.info);
            setStatus("SUCCESS");
            setScoreParam([]);
          } catch (error) {
            setStatus("FAILED");
          }
      }
    };
    fetchData();
  }, [method, model, scoreId, entityType]);

  const scoreDistribution = useMemo(() => {
    if (!(method && model)) {
      return { plotCategory: [], plotData: [] };
    }
    let plotData: Array<number> = [];
    let plotCategory: Array<string> = [];
    switch (method) {
      case "ScoreCard": {
        const paramsOrder = getScoreCardParamOrder(method, model);
        const res = scoreParam
          .map((item) => {
            const score = item.reduce((result, currentItem, index) => {
              const param =
                Number((modelDetail.scoreFormula || ({} as ScoreFormula))[paramsOrder[index]]) || 0;
              return Math.floor(result + param * currentItem);
            }, 0);
            return score;
          })
          .sort();
        let i = 300 / gap;
        let j = 0;
        while (i * gap < 850) {
          let count = 0;
          while (res[j] < (i + 1) * gap) {
            count += 1;
            j += 1;
          }
          plotData.push(count);
          plotCategory.push(`${i * gap}-${(i + 1) * gap}`.toString());
          i++;
        }
        return {
          plotData,
          plotCategory,
        };
      }
      case "PageRank":
        return {
          plotData: pageRankData.values,
          plotCategory: pageRankData.categories,
        };
    }
  }, [method, model, modelDetail, scoreParam, pageRankData]);

  return {
    scoreParam,
    status,
    scoreDistribution,
    info,
  };
}
