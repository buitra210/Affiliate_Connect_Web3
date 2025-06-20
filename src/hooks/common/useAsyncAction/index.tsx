import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  actionFunc: () => Promise<void>;
  onSuccess?: (() => void) | (() => Promise<void>);
  onError?: (() => void) | (() => Promise<void>);
  successText?: string;
  errorText?: string;
};

export default function useAsyncAction({
  errorText,
  onError,
  onSuccess,
  successText,
  actionFunc,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const action = async () => {
    setLoading(true);
    try {
      actionFunc && (await actionFunc());
      successText && toast.success(successText);
      onSuccess && onSuccess();
    } catch (error) {
      toast.error(errorText || (error as Error).message);
      onError && onError();
    }
    setLoading(false);
  };
  return { loading, action };
}
