import { RTHomeProject } from "@centic-scoring/api/services";
import AOSInit from "@centic-scoring/components/aos";
import { Meta } from "@centic-scoring/components/Meta";

export type HomeData = {
  defis: RTHomeProject["docs"];
  dexes: RTHomeProject["docs"];
  lendings: RTHomeProject["docs"];
};

export default function HomePage() {
  return (
    <>
      <Meta title="Centic | Web3 Intelligence Infrastructure" />
      <AOSInit />
    </>
  );
}
