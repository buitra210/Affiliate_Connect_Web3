import { Box } from "@mui/material";
import Image, { StaticImageData } from "next/image";

export default function ImageCustom({ alt, src }: { src: StaticImageData; alt: string }) {
  return (
    <Box
      sx={{
        width: "100%",
        background:
          "radial-gradient(50% 50% at 50% 50%, rgba(0, 159, 221, 0.40) 0%, rgba(7, 17, 24, 0.00) 100%)",
      }}
    >
      <Image src={src} alt={alt} />
    </Box>
  );
}
