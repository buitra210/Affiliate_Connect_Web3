import {
  AllScoreReturnType,
  ProfileReturnType,
  ScoreDetailReturnType,
  YourCreationsReturnType,
  YourProfileReturnType,
} from "@centic-scoring/api/services";
import { StateStatus } from "@centic-scoring/components/component";

import { ReactNode, createContext, useContext } from "react";

type dataType = {
  data: any;
};

type HomePageContextType = {
  data: AllScoreReturnType;
};
type YourCreationContextType = {
  data: YourCreationsReturnType;
};
type ScoreDetailContextType = {
  data: {
    scoreData: ScoreDetailReturnType;
  };
};
type YourScoreDetailContextType = {
  data: {
    scoreData: ScoreDetailReturnType;
    status: StateStatus;
  };
};
type ProfileContextType = {
  data: ProfileReturnType;
};
type YourProfileContextType = {
  data: YourProfileReturnType & {
    loading: boolean;
  };
};

const PageContext = createContext<dataType>({} as any);
export const PageContextProvider = (props: { data?: any; children: ReactNode }) => {
  return <PageContext.Provider value={{ data: props.data }}>{props.children}</PageContext.Provider>;
};
export const useHomeContext = () => useContext(PageContext) as HomePageContextType;
export const useYourCreationContext = () => useContext(PageContext) as YourCreationContextType;
export const useScoreDetailContext = () => useContext(PageContext) as ScoreDetailContextType;
export const useYourScoreDetailContext = () =>
  useContext(PageContext) as YourScoreDetailContextType;
export const useProfileContext = () => useContext(PageContext) as ProfileContextType;
export const useYourProfileContext = () => useContext(PageContext) as YourProfileContextType;
