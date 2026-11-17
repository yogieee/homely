import { ADDRESS, MAPS_LINK } from "@/lib/data";
import { MENU_TABS } from "@/lib/menu";

export const SITE_URL = "https://www.homelydining.co.uk";
export const SITE_NAME = "Homely";
export const SITE_TITLE = "Homely | South Indian Restaurant & Event Hall in Coventry";
export const SITE_DESCRIPTION =
  "South Indian restaurant in Coventry. Crispy dosas, Hyderabadi biryani and Andhra curries from family recipes, plus a private event hall for up to 70 guests.";

/** schema.org data so search engines can show Homely as a local restaurant. */
export const RESTAURANT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${SITE_URL}/#restaurant`,
  name: SITE_NAME,
  alternateName: "Homely South Indian Fine Dining",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: [`${SITE_URL}/opengraph-image.jpg`, `${SITE_URL}/images/homely-opened.jpg`],
  logo: `${SITE_URL}/brand/logo-emblem.png`,
  email: "hello@homelydining.co.uk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "135 Walsgrave Road",
    addressLocality: "Coventry",
    postalCode: "CV2 4HG",
    addressRegion: "West Midlands",
    addressCountry: "GB",
  },
  hasMap: MAPS_LINK,
  servesCuisine: ["South Indian", "Indian", "Hyderabadi", "Andhra"],
  priceRange: "££",
  currenciesAccepted: "GBP",
  acceptsReservations: true,
  // The page shows one menu tab at a time, so the full menu goes here for search engines.
  hasMenu: {
    "@type": "Menu",
    name: "Homely Menu",
    url: `${SITE_URL}/#menu`,
    inLanguage: "en-GB",
    hasMenuSection: MENU_TABS.map((tab) => ({
      "@type": "MenuSection",
      name: tab.label,
      hasMenuSection: tab.groups.map((group) => ({
        "@type": "MenuSection",
        name: group.title,
        ...(group.availability ? { description: group.availability } : {}),
        hasMenuItem: group.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          ...(item.note ? { description: item.note } : {}),
          suitableForDiet: item.diet === "veg" ? "https://schema.org/VegetarianDiet" : undefined,
          offers: { "@type": "Offer", price: item.price.toFixed(2), priceCurrency: "GBP" },
        })),
      })),
    })),
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "23:00",
    },
  ],
  containsPlace: {
    "@type": "EventVenue",
    name: "Homely Event Hall",
    description: "Private upstairs event hall for 50 to 70 guests, with catering from the Homely kitchen.",
    maximumAttendeeCapacity: 70,
    address: ADDRESS,
  },
};
