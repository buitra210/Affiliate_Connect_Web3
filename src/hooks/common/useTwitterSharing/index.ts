export default function useTwitterSharing() {
  const generateTWImageSharing = ({
    imageUrl,
    description,
    title,
    redirectUrl,
  }: {
    title?: string;
    imageUrl: string;
    description?: string;
    redirectUrl?: string;
  }) => {
    `${window.location.origin}/sharing?data=${window.btoa(
      JSON.stringify({
        thumbnail: imageUrl,
        description,
        title,
        redirectUrl,
      })
    )}`;
  };
  return { generateTWImageSharing };
}
