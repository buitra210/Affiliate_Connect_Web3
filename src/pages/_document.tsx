import { Meta } from "@centic-scoring/components/Meta";
import { primaryFont } from "../theme/fonts";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default class CenticDocument extends Document {
  // eslint-disable-next-line no-undef
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Centic" />
          <meta name="theme-color" content="#030B10" />
          <meta name="author" content="Centic Team" />
          <meta name="creator" content="Centic Team" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href={"/favicon.ico"} type="image/x-icon" sizes="any" />
          <Meta
            title={"Centic - Discover Growth Intelligence"}
            description={
              "A data analytic platform that provides insights & CDP solutions into Web3 entities by integrating on-chain data in blockchain space and off-chain data in reality."
            }
            imageUrl={"/thumbnail.png"}
            url={"https://centic.io/"}
            keywords={
              "analytic, blockchain data, web3, data analytics, portfolio, cdp, credit score, token health, scoring"
            }
          />
        </Head>
        <body
          className={primaryFont.className + " hide-scrollbar"}
          style={{
            margin: "0px",
            backgroundColor: "#030B10",
          }}
        >
          {/* Google Analytic script */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MR83Q8TL"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
