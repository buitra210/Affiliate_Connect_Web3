import { Montserrat, Roboto_Mono } from "next/font/google";

export const primaryFont = Montserrat({
  variable: "--font-primary",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "400", "500", "600", "700", "800", "900"],
});
export const RobotoMonoFont = Roboto_Mono({
  variable: "--font-primary",
  subsets: ["latin", "vietnamese"],
});
