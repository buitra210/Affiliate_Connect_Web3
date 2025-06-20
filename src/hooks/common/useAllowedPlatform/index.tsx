import { useEffect, useState } from "react";
import useURLQuery from "../useUrlQuery";

const allowed = ["trava", "centic", "thorn", "tcv-platform"];

export default function useAllowedPlatforms() {
  const { id } = useURLQuery();
  const [isWallet, setIsWallet] = useState<boolean>(true);
  useEffect(() => {
    if (allowed.includes(id)) {
      setIsWallet(false);
    }
  }, [id]);
  return isWallet;
}
