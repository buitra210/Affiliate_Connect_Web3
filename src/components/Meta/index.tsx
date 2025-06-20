import Head from "next/head";

interface MetaProps {
  title: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  timestamp?: string;
  keywords?: string;
}

export function Meta({ title, description, url, imageUrl, timestamp, keywords }: MetaProps) {
  return (
    <Head>
      <title>{title}</title>

      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {description !== undefined && (
        <meta name="description" content={description} key="description" />
      )}
      <meta property="og:title" content={title} key="title" />
      {description !== undefined && (
        <meta property="og:description" content={description} key="ogdescription" />
      )}
      <meta name="twitter:creator" content="@Centic_io" />
      <meta property="og:site_name" content="centic.io" />
      {imageUrl && <meta data-rh="true" property="og:image" content={imageUrl} key="ogimage" />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} key="twitterimage" />}
      {imageUrl && <meta name="twitter:image:src" content={imageUrl} />}
      {imageUrl && <meta name="twitter:image:alt" content="cover image" key="twitteralt" />}
      <meta name="twitter:site" content="@centic_io" key="twittersite" />
      <meta
        property="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
        key="twittercard"
      />
      <meta name="twitter:title" content={title} key="twittertitle" />
      {description && (
        <meta name="twitter:description" content={description} key="twitterdescription" />
      )}

      {timestamp && <meta name="revised" content={timestamp} key="timestamp" />}
      {keywords && <meta name="keywords" key="keywords" content={keywords} />}
    </Head>
  );
}
