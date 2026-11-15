export type GalleryPhoto = {
  src: string;
  alt: string;
};

export type GalleryGroup = {
  id: string;
  label: string;
  photos: GalleryPhoto[];
};

const photos = (folder: string, alts: string[]): GalleryPhoto[] =>
  alts.map((alt, i) => ({ src: `/gallery/${folder}/${String(i + 1).padStart(2, "0")}.jpg`, alt }));

export const GALLERY_GROUPS: GalleryGroup[] = [
  {
    id: "food",
    label: "Food",
    photos: photos("food", [
      "Idli, vada and dosa served on steel plates with sambar and chutneys",
      "A tall cone dosa on a banana leaf beside a brass bell",
      "Chilli chicken with tomato and mint chutneys",
      "A sizzling tandoori platter on a wooden board",
      "A spread of starters and grills across the table",
      "Masala dosa with sambar and coconut chutney",
      "Hariyali kebabs on a dark blue plate with salad",
      "Tandoori chicken on a banana leaf",
      "Golden bondas on a steel plate with chutneys",
      "A mixed grill platter with onions and mint chutney",
      "Mysore bondas with sambar and chutney",
      "Malai kebabs with a fresh salad",
      "Crispy chilli chicken with dips",
      "Biryani in a copper bowl with raita and onions",
      "Dosa and mini bondas on steel plates",
      "Soft idlis on a banana leaf with podi and chutneys",
    ]),
  },
  {
    id: "space",
    label: "Our Space",
    photos: photos("space", [
      "The Homely restaurant on Walsgrave Road lit up at night",
      "The dining room with a Charminar mural along the wall",
      "A painted glass chandelier between woven pendant lamps",
      "The welcome counter in golden marble below a wall clock",
      "The glowing staircase up to the event hall",
      "Long tables in the downstairs dining room",
      "A woven lamp glowing in the dark",
      "A private dining table under soft ceiling lights",
      "Counter seating below carved wooden arches",
      "The upstairs event hall with red seating",
      "A hand-painted plate set into a carved arch",
      "Booth seating beside a red brick wall",
      "Fairy-lit windows looking out over Walsgrave Road",
      "Red sofa seating in the upstairs hall",
      "Rows of red chairs set out for an event",
      "Cosy booths under warm brick-wall lighting",
    ]),
  },
  {
    id: "celebrations",
    label: "Celebrations",
    photos: photos("celebrations", [
      "Guests dressed up in front of the Charminar wall",
      "A family laughing together at a Homely celebration",
      "Two singers performing a duet for the room",
      "Friends sharing a laugh in silk sarees",
      "A gold trophy glowing against the lights",
      "Families enjoying the show from the red seats",
      "Friends posing together in bright silk sarees",
      "A Happy Diwali backdrop for the celebration",
      "A family sharing a meal downstairs",
      "Guests gathered in the upstairs event hall",
      "Singers on the mic during the evening's music",
      "A guest in a red silk saree at the event",
      "The audience gathered for the evening's programme",
      "Guests seated for a family celebration",
      "A performer singing with a guest",
      "Guests ordering at the counter",
    ]),
  },
];
