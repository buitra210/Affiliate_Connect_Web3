import { Meta } from "@centic-scoring/components/Meta";
import { Box } from "@mui/material";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SharingPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  useEffect(() => {
    if (data.redirectUrl) {
      router.push(data.redirectUrl);
    }
  }, [router, data]);

  return (
    <Box>
      <Meta
        title={data.title || "Centic Platform"}
        imageUrl={data.thumbnail}
        description={data.description}
        timestamp={data.timestamp}
        keywords={data.keywords}
        url={data.url}
      />
    </Box>
  );
}

type PageData = {
  thumbnail?: string;
  redirectUrl?: string;
  title?: string;
  description?: string;
  url?: string;
  timestamp?: string;
  keywords?: string;
};

export const getServerSideProps: GetServerSideProps<{ data: PageData }> = async (context) => {
  const dataEncoded: PageData = JSON.parse(
    Buffer.from(String(context.query.data || ""), "base64").toString("utf-8")
  );
  return {
    props: {
      data: dataEncoded,
    },
  };
};

// {
//   redirectUrl: "https://platform-staging.centic.io/portfolio",
//   title: "Check out Centic Platform",
//   description: "None",
//   url: "https://platform-staging.centic.io/portfolio",
//   keywords: "data analytic",}
