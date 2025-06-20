import { TextField, TextFieldProps, Theme } from '@mui/material';
import { forwardRef } from 'react';

export const FilledInput = forwardRef<HTMLDivElement, TextFieldProps>(function InnerInput(props: TextFieldProps, ref) {
  return (
    <TextField
      ref={ref}
      fullWidth
      autoComplete="off"
      {...props}
      variant="filled"
      sx={{
        '.MuiInputLabel-filled': {
          color: 'text.tertiary',
          '&.Mui-focused': {
            color: 'secondary.main',
          },
          '&.Mui-error': {
            color: 'error.main',
          },
        },
        '.MuiFilledInput-root': {
          borderRadius: 2,
          bgcolor: 'background.default',
          '&::after, &::before': {
            content: 'none',
          },
          '&:hover': {
            bgcolor: 'background.default',
          },
          '&.Mui-focused': {
            boxShadow: (theme: Theme) => `0px 0px 3px 0px ${theme.palette.secondary.main}`,
            bgcolor: 'background.default',
          },
          '&.Mui-error': {
            boxShadow: (theme: Theme) => `0px 0px 3px 0px ${theme.palette.error.main}`,
          },
        },
      }}
    />
  );
});
