import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
// import highcharts3d from "highcharts/highcharts-3d";
// if (typeof Highcharts === "object") {
//   highcharts3d(Highcharts);
// }
import { useMemo } from "react";
import { ScoreFormula } from "@centic-scoring/api/api";
import useDonutConfig from "@centic-scoring/hooks/highcharts/useDonutConfig";

export type ScoreParamType = keyof ScoreFormula;

export type ScoreParamNameType = {
  // eslint-disable-next-line no-unused-vars
  [key in keyof ScoreFormula]: string;
};

export const paramMapping: ScoreParamNameType = {
  //wallet
  totalAssets: "Total assets",
  dappInteract: "Dapp interactions",
  otherWalletTx: "Other wallet transactions",
  liquidationHis: "Liquidation history",
  loanRatio: "Loan ratio",
  investmentToTotalAssetRatio: "Investment to total-assets ratio",
  holdingAssetTrustWorthiness: "Holding asset trust worthiness",
  //token
  marketCapScore: "MarketCap score",
  tradingVolumeScore: "Trading volume score",
  priceScore: "Price score",
  priceStabilityScore: "Price stability score",
  transactionScore: "Transactions score",
  holderScode: "Holder score",
  holderDistributionScore: "Holder distribution score",
};

const DonusChart3D = ({ plotData, size }: { plotData: ScoreFormula; size?: number }) => {
  const data = useMemo(() => {
    const res = Object.keys(plotData || {}).map((key) => {
      return [paramMapping[key as ScoreParamType], plotData[key as ScoreParamType]];
    });

    return res;
  }, [plotData]);

  const options = useDonutConfig(
    {
      chart: {
        height: size || 240,
        type: "pie",
        options3d: {
          enabled: false,
          alpha: 45,
          beta: 0,
        },
        backgroundColor: "transparent",
        margin: [0, 0, 0, 0],
      },
      plotOptions: {
        pie: {
          borderRadius: 0,
          innerSize: "40%",
        },
      },
      series: [
        {
          states: {
            inactive: {
              opacity: 0.2,
              enabled: true,
            },
          },
          name: "Asset",
          type: "pie",
          data: data,
        },
      ],
      tooltip: {
        formatter: function () {
          return `${this.key}: ${Number(this?.y) * 100 || "No data"}%`;
        },
        enabled: true,
      },
    },
    [data]
  );
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default DonusChart3D;
