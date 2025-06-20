import dynamic from "next/dynamic";
import { Optional, Options } from "react-wordcloud";

const ReactWordcloud = dynamic(() => import("react-wordcloud"), { ssr: false });

export default function WordCloud({
  words,
}: {
  words: {
    text: string;
    value: number;
  }[];
}) {
  const options: Optional<Options> = {
    deterministic: true,
    colors: ["#009FDB"],
    enableTooltip: false,
    fontFamily: "impact",
    fontSizes: [15, 30] as [number, number],
    rotations: 2,
    scale: "sqrt",
    spiral: "archimedean",
    rotationAngles: [-90, 0],
  };
  return <ReactWordcloud words={words || []} options={options} />;
}
