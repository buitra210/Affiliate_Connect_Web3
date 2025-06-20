import useURLQuery from "@centic-scoring/hooks/common/useUrlQuery";
import { useAppDispatch, useKOLOfferSelector } from "@centic-scoring/redux/hook";
import { editForm } from "@centic-scoring/redux/slices/kol-offer";
import { getProjectContact } from "@centic-scoring/redux/slices/kol-offer/fetchFunctions";
import { useEffect } from "react";

export default function DataFetcher() {
  const { offerForm, contact } = useKOLOfferSelector();

  const { id } = useURLQuery();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getProjectContact(id));
    }
  }, [dispatch, id]);
  useEffect(() => {
    if (!offerForm.contactInformation) {
      dispatch(
        editForm({
          contactInformation: contact.data,
        })
      );
    }
  }, [contact.data, offerForm.contactInformation, dispatch]);
  return null;
}
