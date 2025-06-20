import { getThemeConfig } from "../../theme/theme";
import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from "@mui/material";
import { ReactNode, useMemo } from "react";

export default function AppTheme({ children }: { children: ReactNode | undefined }) {
  const theme = useMemo(() => {
    const res_theme = responsiveFontSizes(createTheme(getThemeConfig()), {
      breakpoints: ["sm", "md", "lg"],
      factor: 1.5,
    });
    return res_theme;
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
