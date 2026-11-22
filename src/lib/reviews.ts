/**
 * Written Google reviews for Homely, copied word for word from the Google Business Profile.
 * Long reviews use their opening paragraph. Update GOOGLE_RATING and GOOGLE_REVIEW_COUNT
 * when new reviews come in.
 */

export type GuestReview = { name: string; stars: number; text: string };

export const GOOGLE_RATING = 4.6;
export const GOOGLE_REVIEW_COUNT = 26;

/** Opens the reviews panel for Homely in Google Search. */
export const GOOGLE_REVIEWS_LIST_URL =
  "https://www.google.com/search?q=Homely+135+Walsgrave+Rd+Coventry#lrd=0x48774b0030b61f5f:0xda09e333593eb466,1,,,,";

export const GUEST_REVIEWS: GuestReview[] = [
  {
    name: "Phani Kumar Akella",
    stars: 5,
    text: "We had a wonderful family meal at Homely! If you are looking for truly authentic Indian food, this place is a must-visit. Everything had the perfect balance of spices and a genuine homemade taste that is hard to find.",
  },
  {
    name: "SaiRamesh",
    stars: 5,
    text: "Great breakfast buffet and Wonderful hospitality and warm welcome. Enjoyed vadas and bonds in particular. Sambar and chutneys are delicious.",
  },
  {
    name: "Chethan Kumar Narayanswamy",
    stars: 5,
    text: "An unforgettable dining experience from start to finish! Homely Fine Dining truly lives up to its name, offering an atmosphere that is both upscale and warmly welcoming. Every dish was a masterpiece—bursting with flavor, thoughtfully plated, and made with clearly fresh, top-quality ingredients.",
  },
  {
    name: "Sri Pathi Thumsee",
    stars: 5,
    text: "The food was excellent! A must visit place for anyone craving delicious South Indian breakfast, especially when they have an unlimited breakfast offer😉. Highly recommended! 😋",
  },
  {
    name: "Nicus Cooper",
    stars: 5,
    text: "The owner is amazing. Very welcoming, polite, friendly. The food was Scrumptious. I would recommend to everyone. If you want good food, good experience and feel at home? Come to Homley.",
  },
  {
    name: "Rajendra Prasad K",
    stars: 5,
    text: "Absolutely great place to have tummy full home feeling food. Really nice place",
  },
  {
    name: "Wajid Pasha",
    stars: 5,
    text: "Amazing restaurant with nice ambiance and good food and the location is quite good as well.",
  },
  {
    name: "Gouse Khaji",
    stars: 5,
    text: "Don't miss out if you want authentic spicy south Indian food",
  },
  {
    name: "neelam naveen",
    stars: 5,
    text: "Best food 🍱 in recent times, Service was good.",
  },
  {
    name: "Nagaraj Ganiger",
    stars: 5,
    text: "Very good south Indian traditional food",
  },
  {
    name: "Anu Kk",
    stars: 5,
    text: "Lovely ambience and Homely food",
  },
  {
    name: "Pradeep Putti",
    stars: 5,
    text: "Very nice and joyful",
  },
];
