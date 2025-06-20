import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

type Props = {
  data: { header: string[]; data: string[][] };
};

export default function PreviewData({ data }: Props) {
  return (
    <Box>
      <Typography variant="body2" color="text.secondary" mb={1}>
        Preview
      </Typography>
      <TableContainer
        className="custom-scrollbar"
        sx={{
          "& .MuiTableCell-root": {
            maxWidth: "100px",
          },
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-root": {
              backgroundColor: "background.playground",
            },
          }}
        >
          <TableHead>
            <TableRow>
              {data.header?.map((item, index) => {
                return <TableCell key={index}>{item}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data?.map((row, index) => {
              return (
                <TableRow key={index}>
                  {row.map((cell, index) => {
                    return (
                      <TableCell key={index}>
                        <Typography noWrap>{cell}</Typography>
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
