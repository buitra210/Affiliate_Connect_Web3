import { GIMethods, GIScoreModel, ScoreFormula, ScoreType } from "@centic-scoring/api/api";

export default function getScoreOrder(type?: ScoreType) {
  let paramsOrder: Array<keyof ScoreFormula> = [];
  switch (type) {
    case "Token Score":
      paramsOrder = [
        "marketCapScore",
        "tradingVolumeScore",
        "priceScore",
        "priceStabilityScore",
        "transactionScore",
        "holderScode",
        "holderDistributionScore",
      ];
      break;
    case "Wallet Score":
      paramsOrder = [
        "totalAssets",
        "dappInteract",
        "transactionScore",
        "liquidationHis",
        "loanRatio",
        "investmentToTotalAssetRatio",
        "tradingVolumeScore",
      ];
    // eslint-disable-next-line no-fallthrough
    default:
      paramsOrder = [
        "totalAssets",
        "dappInteract",
        "transactionScore",
        "liquidationHis",
        "loanRatio",
        "investmentToTotalAssetRatio",
        "tradingVolumeScore",
      ];
      break;
  }
  return paramsOrder;
}

//Need change if have more model
export function getScoreCardParamOrder(method: GIMethods, model: GIScoreModel) {
  let paramsOrder: Array<keyof ScoreFormula> = [];
  switch (model) {
    case "Credit Score":
      paramsOrder = [
        "totalAssets",
        "dappInteract",
        "transactionScore",
        "liquidationHis",
        "loanRatio",
        "investmentToTotalAssetRatio",
        "tradingVolumeScore",
      ];
      break;
    case "Token Health":
      paramsOrder = [
        "marketCapScore",
        "tradingVolumeScore",
        "priceScore",
        "priceStabilityScore",
        "transactionScore",
        "holderScode",
        "holderDistributionScore",
      ];
      break;
    case "Wallet Reputation":
    default:
      paramsOrder = [
        "totalAssets",
        "dappInteract",
        "transactionScore",
        "liquidationHis",
        "loanRatio",
        "investmentToTotalAssetRatio",
        "tradingVolumeScore",
      ];
      break;
  }
  return paramsOrder;
}
