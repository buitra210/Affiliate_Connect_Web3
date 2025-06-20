import { Box, SxProps } from '@mui/material';
import React from 'react';

type BoxCustomProps = {
  children: React.ReactNode;
  sx?: SxProps;
  sxInnerBox?: SxProps;
};
export default function BoxCustom({ children, sx, sxInnerBox }: BoxCustomProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, rgba(45, 168, 255, 1) 20%, rgba(200,237,255,1) 100%)',
        padding: '2px',
        borderRadius: '17px',
        maxWidth: '320px',
        width: '260px',
        ...sx,
      }}
    >
      <Box
        sx={{
          minHeight: '450px',
          borderRadius: '15px',
          background: 'linear-gradient(90deg, #071118 0%, rgba(20, 57, 77, 0.50) 400%, #071118 100%)',
          p: 4,
          ...sxInnerBox,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
