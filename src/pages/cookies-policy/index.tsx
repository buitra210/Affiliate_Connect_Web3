/* eslint-disable react/no-unescaped-entities */
import { Meta } from "@centic-scoring/components/Meta";
import { Link } from "@centic-scoring/components/primitives/Link";
import { Typography } from "@mui/material";
import { NextPageWithLayout } from "../_app";
import { PolicyLayout } from "@centic-scoring/layouts/PolicyLayout";

const CookiesPolicyPage: NextPageWithLayout = () => {
  return (
    <>
      <Typography variant="h2" component="h1" align="center" fontWeight={600} mb={6}>
        Cookies Policy on Centic
      </Typography>
      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        1. Introduction
      </Typography>
      <Typography>
        This cookie policy explains what cookies are and how Centic ("we", "us" or "our") uses them.
        Please read the policy in full so that you understand what information we collect using
        cookies and how that information is used. By using our sites, you are agreeing that we can
        use cookies in accordance with this policy.
      </Typography>
      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        2. What are cookies?
      </Typography>
      <Typography>
        Cookies are text files, containing small amounts of information, which are downloaded to
        your browsing device (such as a computer or smartphone) when you visit a website. Cookies
        can be recognized by the website that downloaded them - or other websites that use the same
        cookies. This helps websites know if the browsing device has visited them before.
      </Typography>
      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        3. How long does Centic keep the cookies?
      </Typography>
      <Typography>
        The length of time a cookie will stay on your browsing device depends on whether it is a
        “persistent” or “session” cookie. Session cookies will only stay on your device until you
        stop browsing. Persistent cookies stay on your browsing device after you have finished
        browsing until they expire or are deleted.
      </Typography>
      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        4. Types of Cookies used by Centic
      </Typography>
      <Typography>
        The types of cookies used on our Site can generally be put into one of the following
        categories: strictly necessary; analytics; functionality; advertising; and social media.
      </Typography>
      <Typography variant="subtitle2" component="h3" mt={2.5} mb={1.5}>
        4.1. Strictly Necessary
      </Typography>
      <Typography>
        These cookies are essential to make our website work. They enable you to move around the
        site and use its features. Without these cookies, services that are necessary for you to be
        able to use our site such as accessing secure areas cannot be provided.
      </Typography>
      <Typography variant="subtitle2" component="h3" mt={2.5} mb={1.5}>
        4.2. Analytics Cookies
      </Typography>
      <Typography>
        These cookies collect information about how people are using our website. For example, which
        pages are visited the most often, how people are moving from one link to another and if they
        get error messages from certain pages. These cookies don‘t gather information that
        identifies you.
      </Typography>
      <Typography variant="subtitle2" component="h3" mt={2.5} mb={1.5}>
        4.3. Functionality Cookies
      </Typography>
      <Typography>
        These cookies allow us to remember the choices you make and tailor our site to provide
        enhanced features and content to you. For example, these cookies can be used to remember
        your user name, language choice or country selection, they can also be used to remember
        changes you‘ve made to text size, font and other parts of pages that you can customize.
      </Typography>
      <Typography variant="subtitle2" component="h3" mt={2.5} mb={1.5}>
        4.4. Advertising Cookies
      </Typography>
      <Typography>
        These cookies are used to deliver advertisements that are more relevant to you and your
        interests. They are also used to limit the number of times you see an advertisement as well
        as help measure the effectiveness of the advertising campaign.
      </Typography>
      <Typography variant="subtitle2" component="h3" mt={2.5} mb={1.5}>
        4.5. Social Media Cookies
      </Typography>
      <Typography>
        Some of the pages on our website may contain tools or applications that are linked to
        third-party social media service providers such as Facebook, Twitter or Google+. Through
        these tools or applications, the social media service provider may set its own cookies on
        your device. We do not control these cookies and you should check the social media service
        provider’s website for further details about how they use cookies.
      </Typography>
      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        5. Third-party Cookies
      </Typography>
      <Typography>
        “Third-party cookies” are cookies that another party places on your browsing device when you
        visit our site. Third-parties setting cookies from our website will be providing a service
        to us or a function of the site, but we do not always control how third-party cookies are
        used. You should check the third party’s website for more information about how they use
        cookies.
      </Typography>
      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        6. Cookies Setting
      </Typography>
      <Typography>
        You can usually use the browser that you are viewing this website through to enable, disable
        or delete cookies. You can set your browser to alert you when a cookie is being used and
        accept or reject the cookie. You can also set your browser to refuse all cookies or accept
        only cookies returned to the originating servers. Please note that if you set your browser
        to disable cookies, you may not be able to access secure areas of the Site and other parts
        of the Site may also not work properly.
      </Typography>
      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        7. Modifications of Cookies Policy
      </Typography>
      <Typography>
        Information about the cookies used by us may be updated from time to time, so please check
        back on a regular basis for any changes.
      </Typography>
      <Typography variant="h3" component="h2" mt={3} mb={1.5}>
        8. Contact
      </Typography>
      <Typography>
        If you have any questions about this cookies policy, please contact us by email at{" "}
        <Link href="mailto:centic.biz@gmail.com" target="_blank" underline="hover" fontWeight={400}>
          centic.biz@gmail.com
        </Link>
        .
      </Typography>
    </>
  );
};

CookiesPolicyPage.getLayout = (page) => {
  return (
    <>
      <Meta description="Cookies Policy on Centic" title="Cookies Policy on Centic" />
      <PolicyLayout>{page}</PolicyLayout>
    </>
  );
};

export default CookiesPolicyPage;
