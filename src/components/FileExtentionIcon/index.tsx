import { CsvFileIcon, ExcelIcon } from "@centic-scoring/icons";

type Props = { extention?: FileExtentions };
export type FileExtentions = "csv" | "txt" | "xls" | "xlms";
export default function FileExtentionIcon({ extention }: Props) {
  return (
    <>
      {extention === "csv" && <CsvFileIcon />}
      {extention === "xls" && <ExcelIcon />}
    </>
  );
}
