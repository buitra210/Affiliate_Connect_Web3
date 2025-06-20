/* eslint-disable react/no-unescaped-entities */
import { Meta } from "@centic-scoring/components/Meta";
import { Link } from "@centic-scoring/components/primitives/Link";
import { ListWithCircle, ListWithDisc } from "@centic-scoring/components/primitives/List";
import { ListItem, Typography } from "@mui/material";
import { NextPageWithLayout } from "../_app";
import { PolicyLayout } from "@centic-scoring/layouts/PolicyLayout";

const TermsOfServicePage: NextPageWithLayout = () => {
  return (
    <>
      <Typography variant="h2" component="h1" align="center" fontWeight={600} mb={6}>
        Terms of Service on Centic
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        1. Introduction
      </Typography>
      <Typography mb={1}>
        In these Centic Terms of Service ("Terms"), "we", "our", or "us" refers to Centic. And we
        own and operate the website{" "}
        <Link href="https://centic.io/" target="_blank" underline="hover">
          https://centic.io/
        </Link>{" "}
        ("the Site"). The Site provides access to a blockchain scoring platform “scoring center”
        that allows users to monitor all the performance and activities of Web3 entities
        (“portfolio”, “profile”) and explore their scores through Centic scoring system (“Crypto
        Credit Score”, “Token Health” and so on). These Terms apply to you (“You”) as a user of the
        Site and Centic front-end, including all the products, services, tools and information made
        available on the Site.
      </Typography>
      <Typography>
        Please read these Terms carefully before using the Site. These Terms apply to any person
        accessing the Site. If you don‘t want to be bound by them, you should not access the Site.
        By using the Site in any capacity, you signify that you have read, understood, and agreed to
        be bound by these Terms in their entirety.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        2. Modification of these Terms
      </Typography>
      <Typography>
        We reserve the right, in our sole discretion, to modify these Terms from time to time.
        Changes are binding on users of the Site and will take effect immediately upon posting. As a
        user, you agree to be bound by any changes, variations, or modifications to our terms of
        service. Your continued use of the Site shall constitute acceptance of any such changes,
        variations, or modifications. If you do not agree with any modifications to these Terms, you
        must immediately stop accessing and using the Site. You are advised to check these Terms
        periodically to familiarize yourself with any changes to these Terms.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        3. Eligibility
      </Typography>
      <Typography mb={1}>
        To access or use the Site, you must be able to form a legally binding contract with us.
        Accordingly, you represent that you are at least 18 years old and have the full right,
        power, and authority to enter into and comply with the terms and conditions of these Terms
        on behalf of yourself and any company or legal entity for which you may access or use the
        Site. You further represent that you are not a citizen, resident, or member of any
        jurisdiction or group that is subject to economic sanctions by the United States, or where
        your use of the Site would be illegal or otherwise violate any applicable law. You further
        represent that your access and use of the Site will fully comply with all applicable laws
        and regulations and that you will not access or use the Site to conduct, promote, or
        otherwise facilitate any illegal activity.
      </Typography>
      <Typography>
        We reserve the right to limit the availability of the Site to any person, geographic area or
        jurisdiction we so desire including (but not limited to) Vietnam and/or to terminate your
        access to and use of the site, at any time and in our sole discretion.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        4. Registration
      </Typography>
      <ListWithDisc dense>
        <ListItem>
          <Typography>
            <b>Connecting Your Wallet</b>. In order to use the Interface and access certain features
            of the Services you may need a Wallet that is supported by or compatible with the
            Services.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <b>Third-Party Accounts</b>. In order to access certain features of the Services, you
            may be required to use certain Third-Party Accounts in connection with the Services.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <b>Representations</b>. You represent that you are not a person barred from using the
            Services under the laws of the United States, your place of residence or any other
            applicable jurisdiction. You are responsible for all activities that occur during your
            use of the Services. You agree that you shall monitor your use of the Services to
            restrict use by minors, and you will accept full responsibility for any unauthorized use
            of the Services by minors.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            <b>Necessary Equipment and Software</b>. You must provide all equipment, software, and
            hardware necessary to connect to the Services. You are solely responsible for any fees,
            including Internet connection or mobile fees, that you incur when accessing the
            Services. You are solely responsible for keeping your hardware devices secure. Centic
            will not be responsible if someone else accesses your devices and authorizes a
            transaction upon receipt of a valid transfer initiated from the Services.
          </Typography>
        </ListItem>
      </ListWithDisc>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        5. Prohibited Activity
      </Typography>
      <Typography>
        You will comply with all applicable domestic and international laws, statutes, ordinances
        and regulations applicable to your use of the Site. As a condition to accessing or using the
        the Site, you:
      </Typography>
      <ListWithDisc dense>
        <ListItem>
          <Typography>
            will only use the Services and the Site for lawful purposes and in accordance with these
            Terms.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            will ensure that all information that you provide on the Site is current, complete, and
            accurate.
          </Typography>
        </ListItem>
        <ListItem>
          <Typography>
            will maintain the security and confidentiality of access to your cryptocurrency wallet
            address.
          </Typography>
        </ListItem>
      </ListWithDisc>
      <Typography>
        You agree not to engage in, or attempt to engage in, any of the following categories of
        prohibited activity in relation to your access and use of the Site:
      </Typography>
      <ListWithDisc dense>
        <ListItem>
          <Typography>will be prohibited from any Intellectual Property Infringement:</Typography>
          <ListWithCircle dense>
            <ListItem>
              <Typography>
                Activity that infringes on or violates any copyright, trademark, service mark,
                patent, right of publicity, right of privacy, or other proprietary or intellectual
                property rights under the law.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Activity that infringes on or misappropriate any contract, intellectual property or
                other third-party right, or commit a tort while using the Site.
              </Typography>
            </ListItem>
          </ListWithCircle>
        </ListItem>
        <ListItem>
          <Typography>will be prohibited from any Cyber Attack Activity:</Typography>
          <ListWithCircle dense>
            <ListItem>
              <Typography>
                Activity that seeks to interfere with or compromise the integrity, security, or
                proper functioning of any computer, server, network, personal device, or other
                information technology system, including (but not limited to) the deployment of
                viruses and denial of service attacks.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                The attempt to circumvent any content filtering techniques or security measures that
                we employ on the Site, or attempt to access any service or area of the Site that you
                are not authorized to access.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Activity that uses any robot, spider, crawler, scraper, or other automated means or
                interface not provided by us, to access the Site to extract data.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Activity that introduces any malware, virus, Trojan horse, worm, logic bomb,
                drop-dead device, backdoor, shutdown mechanism or other harmful material into the
                Site.
              </Typography>
            </ListItem>
          </ListWithCircle>
        </ListItem>
        <ListItem>
          <Typography>will be prohibited from Fraud and Misrepresentation:</Typography>
          <ListWithCircle dense>
            <ListItem>
              <Typography>
                Activity that misrepresents the truthfulness, sourcing or reliability of any content
                on the Site.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                The use of the Site in any manner that could interfere with, disrupt, negatively
                affect, or inhibit other users from fully enjoying the Site, or that could damage,
                disable, overburden, or impair the functioning of the Site in any manner.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Posting of content on the Site containing unsolicited promotions, commercial
                messages or any chain messages or user content designed to deceive or trick the user
                of the Site.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Posting of content or communications on the Site that are, in our sole discretion,
                libelous, defamatory, profane, obscene, pornographic, sexually explicit, indecent,
                lewd, vulgar, suggestive, harassing, hateful, threatening, offensive,
                discriminatory, bigoted, abusive, inflammatory, fraudulent, deceptive or otherwise
                objectionable.
              </Typography>
            </ListItem>
          </ListWithCircle>
        </ListItem>
        <ListItem>
          <Typography>will be prohibited from Any Other Unlawful Conduct:</Typography>
          <ListWithCircle dense>
            <ListItem>
              <Typography>
                Activity that violates any applicable law, rule, or regulation of Singapore or
                another relevant jurisdiction, including (but not limited to) the restrictions and
                regulatory requirements imposed by law Singapore.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>The use of the Site for any purpose that is unlawful.</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Activity like exporting, re-exporting, or transfering, directly or indirectly, any
                technology in violation of applicable export laws or regulations.
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Activity that encourages or induces any third party to engage in any of the
                activities prohibited under these Terms.
              </Typography>
            </ListItem>
          </ListWithCircle>
        </ListItem>
      </ListWithDisc>
      <Typography>
        We may suspend or disable your access to the Site if we consider it reasonable to do so,
        e.g. you breach these Terms.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        6. Proprietary Right
      </Typography>
      <Typography>
        We own all intellectual property and other rights in the Site and its contents, including
        (but not limited to) software, text, images, trademarks, service marks, copyrights, patents,
        and designs. Unless expressly authorized by us, you may not copy, modify, adapt, rent,
        license, sell, publish, distribute, or otherwise permit any third party to access or use the
        Site or any of its contents. Provided that you are eligible, you are hereby granted a
        single, personal, limited license to access and use the Site. This license is non-exclusive,
        non-transferable, and freely revocable by us at any time without notice or cause. Use of the
        Site or its contents for any purpose not expressly permitted by these Terms is strictly
        prohibited.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        7. Third-party links
      </Typography>
      <Typography>
        The Site may contain hyperlinks or references to third party websites. Any such hyperlinks
        or references are provided for your information and convenience only. We have no control
        over third party websites and accept no legal responsibility for any content, material or
        information contained in them. The display of any hyperlink and reference to any third-party
        website does not mean that we endorse that third party‘s website, products or services. Your
        use of a third-party site may be governed by the terms and conditions of that third-party
        site.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        8. Privacy
      </Typography>
      <Typography>
        Certain areas of our website may record and collect information about you. You can find more
        information about how we will process your personal information in our{" "}
        <Link href="/privacy-policy" underline="hover">
          Privacy Policy
        </Link>
        .
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        9. Disclaimers
      </Typography>
      <Typography>
        <ListWithDisc dense>
          <ListItem>
            <Typography mb={1} fontWeight={600}>
              We Do Not Give Any Financial Advice
            </Typography>
            <Typography ml={-5} mt={0.5} mb={1}>
              The information provided on the Services does not constitute investment advice,
              financial advice, trading advice, or any other advice, and you should not treat any of
              the website's content as such. We do not recommend that any crypto assets,
              commodities, and/or securities should be bought, sold, or held by you. Conduct your
              own due diligence and consult your financial advisor before making any investment
              decisions.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography mb={1} fontWeight={600}>
              Do Your Own Due Diligence
            </Typography>
            <Typography ml={-5} mt={0.5} mb={1}>
              The information provided on the Services is not intended as a complete source of
              information on any particular company, investment, asset or market. An individual
              should never make investment decisions based solely on information contained within
              our Services or associated media (or any service, website, book, tool or app, for that
              matter). All users should assume that ALL INFORMATION PROVIDED REGARDING COMPANIES,
              INVESTMENTS, ASSETS OR MARKETS IS NOT TRUSTWORTHY UNLESS VERIFIED BY THEIR OWN
              INDEPENDENT RESEARCH.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography mb={1} fontWeight={600}>
              Reliability of Data
            </Typography>
            <Typography ml={-5} mt={0.5} mb={1}>
              The contents of the Services and any associated media—data, text, graphics, links, and
              other materials—are based on public information that we do not control. We do not
              represent that the content of the Services is accurate or complete, and it should not
              be relied on as such. The Services and associated media may contain inaccuracies,
              typographical errors, and other errors. All information and materials are provided on
              an “as is” and “as available” basis, without warranty or condition of any kind either
              expressed or implied. We do not warrant the quality, accuracy, reliability, adequacy,
              or completeness of any of such information and material, and expressly disclaim any
              liability for errors or omissions in such information and material. You understand
              that you are using any and all information available here at your own risk. Opinions
              expressed herein are merely opinions and merely as of the date of publication of those
              opinions, and may or may not be updated.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography mb={1} fontWeight={600}>
              Past Performance Is No Guarantee of Future Results
            </Typography>
            <Typography ml={-5} mt={0.5} mb={1}>
              Trading results can never be guaranteed. You should be suspicious of anyone who
              promises you guaranteed results. The information provided on the Services and
              associated media regarding the past performance of any crypto assets, or strategy is
              only representative of historical conditions in the marketplace and is not to be
              construed as a guarantee that such conditions will exist in the future or that such
              performance will be achieved in the future. The price and value of investments
              referred to in the Services and associated media, and the income from them may go down
              as well as up, and investors may realize losses on any investments. Past performance
              is no guarantee of future results. Future returns are not guaranteed, and a loss of
              original capital may occur.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography mb={1} fontWeight={600}>
              Suitability of Strategies Is Personal to Your Circumstances
            </Typography>
            <Typography ml={-5} mt={0.5} mb={1}>
              The Services described here may describe crypto assets as not being suitable for all
              investors and not be ideal for you or your situation. You should seek advice from an
              independent financial advisor. None of the content published in the Services
              constitutes a recommendation that any particular crypto asset, security, commodity,
              portfolio of securities, portfolio of commodities, transaction, or investment strategy
              is suitable for any specific person. We are not advising you personally concerning the
              nature, potential, value, or suitability of any particular crypto asset, security,
              commodity, portfolio of securities, portfolio of commodities, transaction, investment
              strategy, or other matter.
            </Typography>
          </ListItem>
          <ListItem>
            <Typography mb={1} fontWeight={600}>
              Consider Other Relevant Factors
            </Typography>
            <Typography ml={-5} mt={0.5} mb={1}>
              While the Services may be of use to investors, traders, and others in evaluating
              certain information about crypto assets it should not be considered to include every
              factor that may be necessary for an investor or trader to make a decision to invest or
              trade. A decision to invest or trade in a particular crypto asset may be based on a
              number of factors, including investors’ needs, goals, and comfort with risk. Before
              making an investment decision you should read all available disclosures published by
              the issuer. Please also consider risks associated with the trading of crypto assets
              including volatility in the market and in individual assets. The Services may provide
              results that identify crypto assets by name, and each name may contain a hyperlink to
              additional information. The additional information may include, among other things,
              price and performance information, and financial/accounting ratios. The Services are
              highly dependent upon data provided by third parties, and we cannot guarantee such
              data’s accuracy, timeliness, or fitness for a specific purpose. The data is subject to
              change and revision by third-party data providers. As with any investments through any
              source, you must decide for yourself if an investment in any crypto assets is
              consistent with your evaluation of the asset, your investment objectives, your risk
              tolerance, your investment time frame, and your financial situation. By making
              information about investments available, we, and the Services, are not recommending or
              endorsing it.
            </Typography>
          </ListItem>
        </ListWithDisc>
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        10. Class Action and Jury Trial Waiver
      </Typography>
      <Typography>
        You must bring any and all Disputes against us in your individual capacity and not as a
        plaintiff in or member of any purported className action, collective action, private
        attorney general action, or other representative proceedings. This provision contains
        mandatory individual arbitration and className action/jury trial waiver provision that
        requires the use of arbitration on an individual basis to resolve disputes, rather than jury
        trials or class actions.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        11. Indemnity
      </Typography>
      <Typography>
        You agree to hold harmless, release, defend, and indemnify us and our officers, directors,
        employees, contractors, agents, affiliates, and subsidiaries from and against all claims,
        damages, obligations, losses, liabilities, costs, and expenses arising from: (a) your access
        and use of the Site; (b) your violation of any term or condition of these Terms, the right
        of any third party, or any other applicable law, rule, or regulation; and (c) any other
        party’s access and use of the Site with your assistance or using any device or account that
        you own or control.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        12. Dispute resolution
      </Typography>
      <Typography>
        Any dispute, controversy, or claim arising out of or in relation to these Terms, including
        the validity, invalidity, breach or termination thereof, shall be settled by arbitration in
        accordance with the Rules of Singapore International Arbitration Centre in force on the date
        when the Notice of Arbitration is submitted in accordance with these Rules. The number of
        arbitrators shall be one or three; the seat of the arbitration shall be determined by the
        arbitrator(s); the arbitral proceedings shall be conducted in English. The applicable law
        shall be Singapore law.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        13. Applicable law
      </Typography>
      <Typography>
        You agree that the laws of Singapore, without regard to principles of conflict of laws,
        govern these Terms and any Dispute between you and us.
      </Typography>

      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        14. General
      </Typography>
      <Typography mb={1}>
        We may perform any of our obligations, and exercise any of the rights granted to us under
        these Terms, through a third party. We may assign any or all our rights and obligations
        under these Terms to any third party.
      </Typography>
      <Typography mb={1}>
        If any clause or part of any clause of these Terms is found to be void, unenforceable or
        invalid, then it will be severed from these Terms, leaving the remainder in full force and
        effect, provided that the severance has not altered the basic nature of these Terms.
      </Typography>
      <Typography mb={1}>
        No single or partial exercise, or failure or delay in exercising any right, power or remedy
        by us shall constitute a waiver by us of, or impair or preclude any further exercise of,
        that or any right, power or remedy arising under these terms and conditions or otherwise.
      </Typography>
      <Typography mb={1}>
        If any of the provisions in these Terms are found to be illegal, invalid or unenforceable by
        any court of competent jurisdiction, the remainder shall continue in full force and effect.
      </Typography>
      <Typography mb={1}>
        All disclaimers, indemnities and exclusions in these Terms shall survive termination of
        these Terms and shall continue to apply during any suspension or any period during which the
        Site is not available for you to use for any reason whatsoever.
      </Typography>
      <Typography>
        These Terms and the documents referred to in them set out the entire agreement between you
        and us with respect to your use of the Site, Centic and the services provided via the Site
        and supersede any and all prior or contemporaneous representations, communications or
        agreements (written or oral) made between you or us.
      </Typography>
    </>
  );
};

TermsOfServicePage.getLayout = (page) => {
  return (
    <>
      <Meta title="Terms of Service on Centic" />
      <PolicyLayout>{page}</PolicyLayout>
    </>
  );
};

export default TermsOfServicePage;
