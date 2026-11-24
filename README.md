# Mahavir Khakhra Gruh Udhyog landing site

A static, mobile-first, four-page brand and information website. It is not an online store. The product range is illustrative until the business confirms the exact items.

## Preview

Open `index.html` in a browser, or serve this folder from a local web server. PWA installation and offline caching require HTTPS in production (or localhost during development).

## Before launch

1. The canonical HTTPS domain is set to `https://mahavirkhakhra.vercel.app/` in the page metadata, JSON-LD, `robots.txt` and `sitemap.xml`. Keep the `/about.html`, `/khakhra.html` and `/contact.html` paths for those pages.
2. Verify the business phone, WhatsApp number, Instagram URL, address, city, region and postal code in `site-config.js`. The contact page and WhatsApp enquiry form use these values.
3. Confirm the true product names, flavours, ingredients, pack sizes and availability. The khakhra page labels its example range so unconfirmed products are not presented as factual.
4. Add genuine business history and photos where indicated. The current copy avoids inventing production methods, certifications, claims or history.
5. Deploy the complete folder to a public HTTPS host. Keep `manifest.webmanifest`, `sw.js`, `robots.txt`, `sitemap.xml` and the `assets` directory at the site root.

The Google Search Console verification file `googlee483a0c4afc5aba0.html` is included unchanged. Keep it at the site root when deploying so Google can verify the site.

## Google Search Console setup

1. Add the real domain as a Domain property in Search Console and verify ownership through the DNS method Google provides.
2. After deployment, submit `https://mahavirkhakhra.vercel.app/sitemap.xml`.
3. Use URL Inspection on the home page and key pages, and request indexing after checking that they are publicly accessible and indexable.
4. Review Search Console indexing and Core Web Vitals reports over time. Metadata and structured data help describe the site; they do not guarantee indexing or rankings.

The pages include unique titles and descriptions, canonical URLs, social sharing metadata, favicon links, semantic page structure, descriptive image alt text, a sitemap and a robots file. The homepage has `WebSite` and `Organization` JSON-LD. Add `LocalBusiness` structured data only after confirming the public business address, hours and other details; add genuine facts only.

## Installable web app and Android package

The Web App Manifest includes the app name, icons, start URL, scope, display mode and theme colors. The service worker caches the informational pages for offline viewing. Browsers generally require HTTPS for service workers and app installation. Test install and offline behavior on the deployed HTTPS domain.

This folder is PWA-ready; it does not contain a signed APK. The manifest now uses the Vercel origin as its stable app ID and includes Android home-screen shortcuts. The service worker registers from the site root as soon as the page script runs, and its install step tolerates a missing optional cached asset. Deploy the complete folder to Vercel, then confirm `https://mahavirkhakhra.vercel.app/sw.js` opens and PWABuilder detects a service worker.

To make a Trusted Web Activity APK, choose an Android application ID, create and securely back up a signing key, then generate the Android package with PWABuilder or Bubblewrap. Publish `/.well-known/assetlinks.json` with that application ID and the signing certificate fingerprint so Android can verify the relationship between the app and this domain. The signing key and fingerprint are required to finish the verified app setup; this archive does not include a signed APK.

## Motion and accessibility

Sections animate into view as visitors scroll. The site respects `prefers-reduced-motion`, uses native links and buttons, includes mobile navigation, and provides descriptive alt text and live status feedback.

The supplied brand logo appears in the page header. Khakhra illustrations replace the other on-page logo images; the browser and installed app icons use a khakhra illustration.

## Photo placeholders

The home page has two blank photo spaces and the About page has one. Replace each div with class hero-photo-slot or eature-image with your own photo <img> element and save the image under ssets/. Browser and app icons are neutral placeholders until you add final artwork.
