import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const demo_data = [
  {
    chain: "0x1",
    address: "0xDemoAddress",
    name: "Demo Address",
    Dapp: "Demo Dapp",
    Tag: "Contract",
    abiFileUrl: "https://centic.io",
  },
  {
    chain: "0x1",
    address: "0xDemoAddress2",
    name: "Demo Address 2",
    Dapp: "Demo Dapp 2",
    Tag: "Contract 2",
    abiFileUrl: "https://centic2.io",
  },
];

export default function Preview() {
  return (
    <TableContainer
      className="custom-scrollbar"
      sx={{
        "& .MuiTableCell-root": {
          maxWidth: "100px",
        },
      }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#0E1B25" }}>
          <TableRow>
            <TableCell>Chain</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Dapp</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell sx={{ textWrap: "nowrap" }}>ABI File URL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "background.hover" }}>
          {demo_data.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Typography noWrap>{row.chain}</Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap>{row.address}</Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap>{row.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap>{row.Dapp}</Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap>{row.Tag}</Typography>
                </TableCell>
                <TableCell>
                  <Typography noWrap>{row.abiFileUrl}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
