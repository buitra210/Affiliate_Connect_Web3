import { Tabs, TabsProps } from "@mui/material";

export function AppTabs(props: TabsProps) {
  return (
    <Tabs
      variant="scrollable"
      scrollButtons={false}
      {...props}
      sx={{
        ".MuiTabs-flexContainer": {
          position: "relative",
          minWidth: "fit-content",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            borderRadius: "10px",
            backgroundColor: "#0D1921",
            zIndex: -1,
          },
          ".MuiTab-root": {
            flexGrow: 1,
            overflow: "visible",
            "&[disabled]": {
              color: "text.primary",
              opacity: 0.3,
              cursor: "not-allowed",
              pointerEvents: "auto",
            },
          },
        },
        ".MuiTabs-indicator": {
          height: 4,
          borderRadius: "10px",
          bgcolor: "text.active",
        },
        ...props.sx,
      }}
    />
  );
}
