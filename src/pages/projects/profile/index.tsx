import { YourProfileReturnType, getYourProfile } from "@centic-scoring/api/services";
import { Meta } from "@centic-scoring/components/Meta";
import { PageContextProvider } from "@centic-scoring/context/page-context";
import ForProjectLayout from "@centic-scoring/layouts/ForProjectLayout";
import EditProfile from "@centic-scoring/module/EditProfile";
import { NextPageWithLayout } from "@centic-scoring/pages/_app";
import { useEffect, useState } from "react";

const ProfilePage: NextPageWithLayout = () => {
  const [userData, setUserData] = useState<YourProfileReturnType>();

  useEffect(() => {
    const fetchData = async () => {
      let profileData: YourProfileReturnType = {} as YourProfileReturnType;
      try {
        profileData = await getYourProfile();
        setUserData(profileData);
      } catch (error) {
        //pass
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Meta
        description="User Profile | Centic For Project"
        title="User Profile | Centic For Project"
        keywords="web3, profile"
      />
      <PageContextProvider data={userData}>
        <EditProfile />
      </PageContextProvider>
    </>
  );
};

ProfilePage.getLayout = function getLayout(page) {
  return <ForProjectLayout>{page}</ForProjectLayout>;
};

export default ProfilePage;
