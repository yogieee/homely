export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Offers", href: "#offers" },
  { label: "Our Story", href: "#our-story" },
  { label: "Four States", href: "#four-states" },
  { label: "Menu", href: "#menu" },
  { label: "Event Hall", href: "#event-hall" },
  { label: "Visit Us", href: "#visit-us" },
];

export const FOODHUB_URL = "https://foodhub.co.uk";

export type Offer = {
  tag: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  cta: { label: string; href: string; external?: boolean };
};

export const OFFERS: Offer[] = [
  {
    tag: "Now Open",
    eyebrow: "Ma's Flavours Is Now",
    title: "Homely Has Opened",
    subtitle: "The same family recipes in a brand-new fine dining home on Walsgrave Road.",
    image: "/images/offer-now-open.jpg",
    alt: "A restaurant doorway decorated with a marigold toran and brass lamps for its opening",
    cta: { label: "Read Our Story", href: "#our-story" },
  },
  {
    tag: "50 to 70 Guests",
    eyebrow: "Private Events",
    title: "Celebrate Upstairs",
    subtitle: "Birthdays, naming ceremonies and family milestones in our private event hall.",
    image: "/images/offer-private-events.jpg",
    alt: "A celebration table with a candle-lit cake, marigold petals and brass thalis",
    cta: { label: "Enquire Now", href: "#event-hall" },
  },
  {
    tag: "Delivery",
    eyebrow: "Order Online",
    title: "Homely at Home",
    subtitle: "Dosas, biryanis and curries delivered fresh to your door through Foodhub.",
    image: "/images/offer-delivery.jpg",
    alt: "A South Indian takeaway of biryani, dosa and curries unpacked on a home dining table",
    cta: { label: "Order on Foodhub", href: FOODHUB_URL, external: true },
  },
];

export type SocialPlatform = "facebook" | "instagram" | "tiktok" | "trustpilot";

export const SOCIAL_LINKS: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  { platform: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { platform: "tiktok", label: "TikTok", href: "https://www.tiktok.com/" },
  { platform: "trustpilot", label: "Trustpilot", href: "https://uk.trustpilot.com/" },
];

export const ADDRESS = "135 Walsgrave Rd, Coventry CV2 4HG";
export const MAPS_LINK = "https://maps.app.goo.gl/8CrpqQbRYaKHh5Gu5";
export const MAPS_EMBED = "https://www.google.com/maps?q=135+Walsgrave+Rd,+Coventry+CV2+4HG&z=16&output=embed";

export type StateJourney = {
  id: string;
  state: string;
  region: string;
  title: string;
  description: string;
  spiceProfile: string;
  image: string;
  landmark: string;
  menuPicks: string[];
};

export const STATE_JOURNEYS: StateJourney[] = [
  {
    id: "karnataka",
    state: "Karnataka",
    region: "Hampi",
    title: "The Royal Granaries of Hampi",
    description:
      "Hampi sits on the banks of the Tungabhadra River. Centuries ago it was a royal capital, famous for its busy food bazaars and huge temple feasts. From Karnataka we bring the comforting stuff: crisp dosas, soft bondas and slow roasted spice pastes, balanced with a little coconut and jaggery, just like at home.",
    spiceProfile: "Medium heat, with Byadgi chilli, jaggery and roasted coconut",
    image: "/images/landmark-karnataka-wide.jpg",
    landmark: "Stone Chariot, Hampi",
    menuPicks: ["Mysore Bonda", "Gunta Ponganalu", "Crispy Masala Dosa", "Ghee Roast Mutton Fry"],
  },
  {
    id: "tamil-nadu",
    state: "Tamil Nadu",
    region: "Chettinad",
    title: "The Spice Mansions of Chettinad",
    description:
      "Tamil Nadu is famous for Chettinad, the cooking of a merchant community who travelled the world and came home with a love of bold spice. Think sun dried chillies, roasted star anise and kalpasi. But ask most people from Tamil Nadu what home tastes like and they'll talk about soft idlis, crisp vadas and a good sambar. That's what we serve.",
    spiceProfile: "Medium heat, with gunpowder podi, black pepper and curry leaf",
    image: "/images/landmark-tamil-nadu-wide.jpg",
    landmark: "Brihadeeswarar Temple, Thanjavur",
    menuPicks: ["Chitti Idli with Sambar", "Ghee Gunpowder Idli & Chutneys", "Onion Uttappam", "Chicken 65"],
  },
  {
    id: "kerala",
    state: "Kerala",
    region: "Thalassery",
    title: "The Pepper Coast of Thalassery",
    description:
      "Long before modern trade routes, ships sailed into Thalassery on the Malabar coast to load up on black pepper, cardamom and cloves. Kerala cooking still tastes of that coast, with curry leaves, coconut and plenty of pepper. At Homely you'll find it in our flaky parottas and pepper roasted prawns.",
    spiceProfile: "Medium heat, with black pepper, cardamom and coconut",
    image: "/images/landmark-kerala-wide.jpg",
    landmark: "Alleppey Backwaters",
    menuPicks: ["Plain Parotta", "Prawns Roast", "Prawn Masala", "Fish Biryani"],
  },
  {
    id: "andhra-pradesh",
    state: "Andhra & Telangana",
    region: "Guntur & Hyderabad",
    title: "The Chilli & Harvest Plains of Guntur",
    description:
      "Guntur, in the Krishna River delta, is India's chilli capital and the fiery heart of Andhra cooking. Expect real heat, tangy gongura and punchy pickles. Cross into Telangana and you reach Hyderabad, where the old Nizami kitchens gave us dum biryani. It's the dish we're proudest of.",
    spiceProfile: "Hot, with Guntur chilli, garlic and curry leaf",
    image: "/images/landmark-andhra-pradesh-wide.jpg",
    landmark: "Charminar, Hyderabad",
    menuPicks: ["Punugulu", "Guntur Karam Wings", "Andhra Chicken Curry", "Royyala Vellulli Vepudu", "Hyderabadi Chicken Dum Biryani", "Double Ka Meetha"],
  },
];

export const OCCASION_TYPES = [
  "Birthday",
  "Anniversary",
  "Family Celebration",
  "Corporate",
  "Other",
] as const;

export const CATERING_STYLES = [
  "Traditional Banana Leaf Feast",
  "Buffet Spread",
  "Plated Menu",
] as const;

export const RESERVATION_TIMES = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
] as const;
