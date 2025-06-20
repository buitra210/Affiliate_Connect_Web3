import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch } from "@centic-scoring/redux/hook";
import { getUserPermission } from "@centic-scoring/redux/slices/permission/fetchFunctions";
import { useEffect } from "react";

export default function InitUserPermission() {
  const { id } = useURLQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getUserPermission(id));
    }
  }, [dispatch, id]);
  return null;
}
