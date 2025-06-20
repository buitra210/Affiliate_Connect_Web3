"use client";

import { Link as MuiLink, LinkProps as MuiLinkProps, styled } from "@mui/material";
import { default as clsx } from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";
import React, { forwardRef } from "react";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

export interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Omit<
      NextLinkProps,
      "as" | "onClick" | "onMouseEnter" | "passHref" | "legacyBehavior" | "onTouchStart"
    > {
  linkas?: NextLinkProps["as"];
}

export const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkComposed(props, ref) {
    return <NextLink ref={ref} {...props} />;
  }
);

export type LinkProps = {
  activeClassName?: string;
  as?: NextLinkProps["as"];
  href: NextLinkProps["href"];
  linkas?: NextLinkProps["as"]; // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, "to" | "linkas" | "href"> &
  Omit<MuiLinkProps, "href">;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const {
    activeClassName = "active",
    as,
    className: classNameProps,
    href,
    linkas: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    // role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props;

  const appPathname = usePathname();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: Boolean(appPathname === pathname && activeClassName),
  });

  const isExternal =
    typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <Anchor
          className={className}
          href={href}
          ref={ref}
          target="_blank"
          underline="none"
          {...other}
        />
      );
    }

    return (
      <MuiLink
        className={className}
        href={href}
        ref={ref}
        target="_blank"
        underline="none"
        {...other}
      />
    );
  }

  const linkas = linkAsProp || as;
  const nextjsProps = { href: href.toString(), linkas, replace, scroll, shallow, prefetch, locale };

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref}
        {...nextjsProps}
        underline="none"
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      className={className}
      ref={ref}
      {...nextjsProps}
      {...other}
    />
  );
});
