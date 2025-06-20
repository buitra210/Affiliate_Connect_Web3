/* eslint-disable no-unused-vars */
import { ThemeOptions } from "@mui/material";
import { cssBaseline } from "./cssBaseline";
import { AccordionArrow } from "@centic-scoring/icons";
import React from "react";

const round = (value: number): number => Math.round(value * 1e5) / 1e5;
const pxToRem = (size: number): string => `${size / 16}rem`;
const buildVariant = (
  fontWeight: number,
  size: number,
  lineHeight: number,
  letterSpacing?: number
) => ({
  fontFamily: "inherit",
  fontWeight,
  fontSize: pxToRem(size),
  lineHeight: `${round(lineHeight / size)}`,
  ...(letterSpacing !== undefined ? { letterSpacing: `${round(letterSpacing / size)}em` } : {}),
});

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xsm: true;
    smm: true;
    xxl: true;
  }

  interface TypographyVariants {
    small: React.CSSProperties;
    big2: React.CSSProperties;
    extraSmall: React.CSSProperties;
    tiny: React.CSSProperties;
    big: React.CSSProperties;
    body3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    small?: React.CSSProperties;
    big2: React.CSSProperties;
    extraSmall?: React.CSSProperties;
    tiny?: React.CSSProperties;
    big?: React.CSSProperties;
    body3?: React.CSSProperties;
  }
}

declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    default: string;
    secondary: string;
    selection: string;
    selectionPlan: string;
    button: string;
    border: string;
    borderPopup: string;
    content: string;
    paper: string;
    paper2: string;
    paper3: string;
    paper4: string;
    paper5: string;
    primary: string;
    header: string;
    playground: string;
    paperHover: string;
    hover: string;
    active: string;
    search: string;
    form: string;
    itemMenu: string;
    table: string;
    warning: string;
    gradientVertical: string;
    input: string;
    adminRow: string;
    disabled: string;
  }
  interface TypeText {
    primary: string;
    secondary: string;
    active: string;
    active2: string;
    active3: string;
    active4: string;
    label1: string;
    revoked: string;
    jsonKey: string;
    jsonValue: string;
    score: string;
    error: string;
    filter: string;
    success: string;
    warning: string;
  }
}
declare module "@mui/material/styles" {
  interface TypographyVariants {
    score: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    score?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;
    subtitle1: true;
    subtitle2: true;
    caption: true;
    body1: true;
    body2: true;
    body3: true;
    small: true;
    extraSmall: true;
    tiny: true;
    button: true;
    score: true;
    big: true;
    big2: true;
  }
}

declare module "@mui/material/TextField" {
  interface TextFieldPropsColorOverrides {
    active: true;
  }
}
export const getThemeConfig = (): ThemeOptions => {
  return {
    typography: {
      big: buildVariant(400, 80, 85),
      big2: buildVariant(700, 42, 54),
      h1: buildVariant(400, 39, 47.54),
      h2: buildVariant(600, 30, 36.75),
      h3: buildVariant(600, 24, 24),
      h4: buildVariant(600, 20, 24.38),
      h5: buildVariant(600, 18, 24),
      h6: buildVariant(700, 17, 20),
      body1: buildVariant(400, 16, 20),
      body2: buildVariant(400, 14, 20),
      body3: buildVariant(600, 12, 16),
      subtitle1: buildVariant(600, 16, 24, 0),
      subtitle2: buildVariant(600, 14, 20, 0),
      caption: buildVariant(400, 14, 20, 0.15),
      button: {
        ...buildVariant(600, 14, 20),
        textTransform: "none",
      },
      small: buildVariant(400, 12, 15),
      extraSmall: buildVariant(400, 11, 16),
      score: buildVariant(700, 35, 45),
      tiny: buildVariant(400, 8, 9.75),
    },
    breakpoints: {
      keys: ["xs", "xsm", "sm", "md", "lg", "xl", "xxl"],
      values: {
        xs: 0,
        xsm: 480,
        sm: 600,
        smm: 840,
        md: 960,
        lg: 1280,
        xl: 1440,
        xxl: 1600,
      },
    },
    //color
    palette: {
      mode: "light",
      primary: {
        main: "#3fc668",
        light: "#69F59D",
        dark: "#02513D",
      },
      secondary: {
        main: "#131816",
        light: "#C3C4C3",
        dark: "#CCC",
      },
      background: {
        default: "transparent",
        paper: "#F1f1f1",
        paper2: "#1B2E3D",
        paper3: "#F1F1F1",
        paper4: "rgba(255, 255, 255, 0.62)",
        paper5: "rgba(0, 0, 0, 0.06)",
        primary: "transparent",
        secondary: "#D8D8D8",
        content: "linear-gradient(142deg, #CFEFD6 0%, #E9F6DF 35%, #FDF1FF 65%, #F0E8FF 100%)",
        selection: "linear-gradient(99deg, #0AE16B 0%, #8EFFC7 60.15%, #40FF96 100%)",
        selectionPlan:
          "linear-gradient(141.53deg, #F7FFF8 0%, #F3FFE9 35%, #FDEFFF 65%, #F9F6FF 100%)",
        gradientVertical: "linear-gradient(99deg, #0AE16B 0%, #8EFFC7 60.15%, #40FF96 100%)",
        hover: "linear-gradient(90deg, #0E1713 0%, #0A4C31 48%, #0E1713 100%)",
        button: "linear-gradient(99deg, #0AE16B 0%, #8EFFC7 60.15%, #40FF96 100%)",
        border: "#E3E3E3",
        borderPopup: "#F1F1F1",
        header: "#2A3C48",
        playground: "#0A1116",
        paperHover: "#10202B",
        active: "#1D3142",
        search: "#010305",
        form: "#0C1822",
        itemMenu: "#26465F",
        table: "#F3F3F3",
        warning: "#FFD6A4",
        input: "#FDFDFD",
        adminRow: "linear-gradient(120deg, #EBFFEF 16.93%, #F9F8FB 50.09%, #FFF 83.07%)",
        disabled: "rgba(0, 0, 0, 0.05)",
      },
      action: {
        hover: "#8A8A8A",
        active: "#484848",
        focus: "#484848",
      },
      info: {
        main: "#059669",
        light: "#CDFEE1",
        dark: "#8EFFC7",
      },
      warning: {
        main: "#5E4200",
        light: "#FFF1E3",
        dark: "#FFB800",
      },
      success: {
        main: "#0C5132",
        light: "#CDFEE1",
        dark: "#29845A",
      },
      error: {
        main: "#8E1F0B",
        light: "#FEE9E8",
        dark: "#E51C00",
      },
      text: {
        primary: "#121212",
        secondary: "#616161",
        active: "#3fc668",
        active2: "#696969",
        active3: "#047857",
        active4: "#8EFFC7",
        label1: "#6D8198",
        revoked: "#DB8686",
        jsonKey: "#3fc668",
        jsonValue: "#FFF",
        score: "#3fc668",
        error: "#B91C1C",
        filter: "#69F59D",
        success: "#059669",
        warning: "#B45309",
      },
      divider: "#344456",
    },
    components: {
      MuiCssBaseline: cssBaseline,
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: "38px",
            textTransform: "none",
            borderRadius: "22px",
            fontSize: "14px",
            fontWeight: 600,
            py: "10px",
            px: "16px",
            boxShadow: "none",
          },
          containedPrimary: {
            background: "linear-gradient(99deg, #0AE16B 0%, #8EFFC7 60.15%, #40FF96 100%)",
            color: "#09120E",
            border: "none",
            ":hover": {
              backgroundColor: "#3fc668",
              opacity: 0.9,
            },
          },
          containedInfo: {
            backgroundColor: "#CDFEE1",
            color: "#059669",
            border: "none",
            ":hover": {
              backgroundColor: "#8EFFC7",
            },
          },
          outlinedPrimary: {
            border: "1px solid #0AE16B",
            color: "#121212",
            background:
              "linear-gradient(99deg, rgba(10, 225, 107, 0.32) 0%, rgba(142, 255, 199, 0.32) 60.15%, rgba(64, 255, 150, 0.32) 100%)",
            ":hover": {
              border: "1px solid #0AE16B",
            },
          },
          containedSecondary: {
            backgroundColor: "#C3C4C3",
            color: "#131816",
            border: "none",
            ":hover": {
              backgroundColor: "#D8D8D8",
            },
          },
          outlinedSecondary: {
            backgroundColor: "transparent",
            color: "#0AE16B",
            border: "1px solid #0AE16B",
            ":hover": {
              backgroundColor: "rgba(10, 225, 107, 0.1)",
              color: "#3fc668",
              border: "1px solid #3fc668",
            },
          },
          outlinedInfo: {
            backgroundColor: "#FFFFFF",
            color: "#059669",
            border: "1px solid #059669",
            ":hover": {
              backgroundColor: "#CDFEE1",
            },
          },
          textPrimary: {
            backgroundColor: "transparent",
            border: "none",
            color: "#616161",
            ":hover": {
              backgroundColor: "transparent",
              color: "#3fc668",
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: "14px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            border: "none",
            color: "#121212",
            "& .MuiFormLabel-root": {
              color: "#3fc668",
            },
            "& .MuiInputBase-colorSecondary": {
              backgroundColor: "#FDFDFD",
              boxShadow: "0px 3px 4px 0px rgba(63, 198, 104, 0.1) inset",
            },
            "& .MuiFormHelperText-root": {
              marginTop: "0px",
              marginBottom: "5px",
            },
            "& .MuiSelect-icon": {
              color: "#616161",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            "& fieldset": {
              borderColor: "#E3E3E3",
            },
            "&:hover fieldset": {
              borderColor: "#8A8A8A",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#484848",
            },
            "&.Mui-error fieldset": {
              borderColor: "1px solid #8E1F0B",
            },
            "& :-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 1000px #FFFFFF inset !important",
            },
          },
          colorSecondary: {
            "& fieldset": {
              borderColor: "#0C5132",
            },
            "&.MuiOutlinedInput-root": {
              backgroundColor: "#FDFDFD",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            backgroundColor: "red",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: "none",
            height: "100%",
            ":first-of-type": {
              paddingLeft: "24px",
            },
            ":last-of-type": {
              paddingRight: "24px",
            },
            color: "inherit",
            fontWeight: "inherit",
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            backgroundColor: "#F7F7F7",
            color: "#616161",
            fontWeight: 500,
            "& .MuiTableCell-root": {
              height: "25px",
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&.MuiTableRow-hover": {
              ":hover": {
                backgroundColor: "#F0FDF4",
                boxShadow: "0px 3px 6px 0px rgba(63, 198, 104, 0.12)",
              },
            },
          },
        },
      },
      MuiTableBody: {
        styleOverrides: {
          root: {
            "& .MuiTableCell-root": {
              height: "53px",
            },
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          PaperProps: {
            style: {
              backgroundColor: "#FFFFFF",
            },
            elevation: 0,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#FFFFFF",
            color: "#121212",
            padding: "10px",
            borderRadius: "5px",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "#F0FDF4",
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: "#F7F7F7",
            position: "initial",
            "&.MuiAccordion-root:first-of-type": {
              borderRadius: "14px",
            },
            "&.MuiAccordion-root:last-of-type": {
              borderRadius: "14px",
            },
            borderRadius: "14px",
            "& .MuiAccordionSummary-root": {
              color: "#616161",
              "&.Mui-expanded": { color: "#3fc668" },
            },
          },
        },
      },
      MuiAccordionSummary: {
        defaultProps: {
          expandIcon: <AccordionArrow />,
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            background: "#F7F7F7",
            boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.15)",
            padding: "0px 8px",
            borderRadius: "16px",
            "& .MuiMenuItem-root.Mui-selected": {
              color: "#121212 !important",
              background:
                "linear-gradient(99deg, rgba(10, 225, 107, 0.12) 0%, rgba(142, 255, 199, 0.12) 60.15%, rgba(64, 255, 150, 0.12) 100%) !important",
            },
            "& .MuiMenuItem-root": {
              fontWeight: 400,
              color: "#616161",
            },
            "& .MuiMenuItem-root:hover": {
              background: "#cecece75",
              fontWeight: 600,
            },
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {
          ListboxProps: {
            sx: {
              boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.05)",
            },
          },
        },
        styleOverrides: {
          noOptions: {
            backgroundColor: "#FFFFFF",
            borderRadius: "0px",
            borderTop: "1px solid #E3E3E3",
            padding: "0px",
          },
        },
      },
    },
  };
};
