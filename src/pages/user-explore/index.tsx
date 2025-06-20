import { Meta } from "@centic-scoring/components/Meta";
import AppLayout from "@centic-scoring/layouts/AppLayout";
import UserExplore from "@centic-scoring/module/UserExplore";

export default function UserExplorePage() {
  return (
    <AppLayout>
      <Meta description="User Explore" title="User Explore" />
      <UserExplore />
    </AppLayout>
  );
}
