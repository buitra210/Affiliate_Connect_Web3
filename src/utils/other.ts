export function getGraphName(questGraphID: string) {
  switch (questGraphID) {
    case "usage-performance":
      return "Usage Performance";
    case "user-last-24-hours":
      return "User Last 24 hours";
    case "similar-dapps":
      return "Similar DApps";
    case "new-vs-return":
      return "New vs Returning Users";
    case "retention-report":
      return "Retention Report";
    case "holder-classification":
      return "Holder Classification by Balance and Time";
    case "holder-distribution":
      return "Holder Distribution by Prominent Foundations/Wallets/Smart Contracts";
    default:
      return questGraphID;
  }
}
