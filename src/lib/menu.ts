export type MenuDiet = "veg" | "nonveg";

export type MenuEntry = {
  name: string;
  price: number;
  diet: MenuDiet;
  spicy?: boolean;
  note?: string;
};

export type MenuGroup = {
  title: string;
  availability?: string;
  items: MenuEntry[];
};

export type MenuTab = {
  id: string;
  label: string;
  groups: MenuGroup[];
};

const v = (name: string, price: number, spicy = false, note?: string): MenuEntry => ({
  name,
  price,
  diet: "veg",
  spicy,
  note,
});

const n = (name: string, price: number, spicy = false, note?: string): MenuEntry => ({
  name,
  price,
  diet: "nonveg",
  spicy,
  note,
});

export const MENU_TABS: MenuTab[] = [
  {
    id: "tiffins",
    label: "Tiffins & Breakfasts",
    groups: [
      {
        title: "Tiffins & Breakfasts",
        availability: "Available all day",
        items: [
          v("Mysore Bonda", 4),
          v("Punugulu", 4),
          v("Gunta Ponganalu", 4),
          v("Idli & Chutneys", 4),
          v("Ghee Idli & Chutneys", 5),
          v("Ghee Karam Idli & Chutneys", 5, true),
          v("Ghee Gunpowder Idli & Chutneys", 5, true),
          v("Chitti Idli with Sambar", 5),
          v("Chitti Vada with Sambar", 5),
          v("Idli, Vada with Sambar & Chutneys", 6),
          v("Crispy Dosa", 4),
          v("Crispy Masala Dosa", 5, true),
          v("Crispy Onion Dosa", 5),
          v("Crispy Karam Masala Dosa", 5, true),
          v("Crispy Gunpowder Masala Dosa", 5, true),
          v("Onion Uttappam", 5),
          v("Gunpowder Onion Uttappam", 5, true),
          n("Double Egg Crispy Dosa", 6),
          n("Chicken Kheema Crispy Dosa", 6, true),
          n("Mutton Kheema Crispy Dosa", 7, true),
          v("Poori Aloo Masala", 5),
          n("Poori with Chicken Kheema", 6, true),
          n("Poori with Mutton Kheema", 7, true),
        ],
      },
    ],
  },
  {
    id: "starters",
    label: "Starters",
    groups: [
      {
        title: "Veg Starters",
        items: [
          v("Vegetable Spring Rolls", 3),
          v("Samosa", 3),
          v("Gobi Manchurian", 7, true),
          v("Chilli Mushroom", 7, true),
          v("Mushroom 65", 7, true),
          v("Crispy Chilli Baby Corn", 7, true),
          v("Paneer Majestic", 8),
          v("Paneer Chilli Karam", 8, true),
          v("Veg Manchurian (Dry)", 8),
          v("Veg Manchurian (Wet)", 8),
          v("Soya Chilli Chicken (Veg)", 8, true),
          v("Soya 65", 9, true),
        ],
      },
      {
        title: "Non-Veg Starters",
        items: [
          n("Egg 65", 7, true),
          n("Golichina Chicken Wings", 8, true),
          n("Guntur Karam Wings", 8, true),
          n("Chicken 65", 8, true),
          n("Chilli Chicken", 8, true),
          n("Chicken Majestic", 8),
          n("Chicken Lollipop (Dry)", 8),
          n("Chicken Lollipop (Wet)", 8),
          n("Ghee Roast Mutton Fry", 10),
          n("Garlic Mutton Fry", 10),
          n("Royyala Vellulli Vepudu", 10, true),
          n("Prawns Roast", 10, true),
          n("Apollo Fish", 10, true),
        ],
      },
    ],
  },
  {
    id: "curries",
    label: "Curries",
    groups: [
      {
        title: "Veg Curries",
        items: [
          v("Dal Tadka", 6),
          v("Mix Vegetable Korma", 6),
          v("Mushroom Mutter Masala", 6),
          v("Aloo Korma", 6),
          v("Shahi Paneer", 7.5),
          v("Paneer Makhani", 7.5),
          v("Paneer Butter Masala", 7.5),
          v("Rajma Masala", 6),
          v("Veg Kofta Masala", 7.5),
          v("Soya Kofta Masala", 7.5),
          v("Soya Chaap Masala", 8),
          v("Paneer Burji", 8),
        ],
      },
      {
        title: "Non-Veg Curries",
        items: [
          n("Egg Curry", 7),
          n("Butter Chicken", 8),
          n("Chicken Tikka Masala", 8),
          n("Chicken Korma", 8),
          n("Chicken Vindaloo", 8, true, "with bone"),
          n("Andhra Chicken Curry", 8, true, "with bone"),
          n("Mutton Curry", 9),
          n("Mutton Korma", 9),
          n("Lamb Karahi", 9),
          n("Lamb Vindaloo", 9, true),
          n("Lamb Kheema Curry", 9, true),
          n("Prawn Masala", 9, true),
        ],
      },
    ],
  },
  {
    id: "tandoor",
    label: "Tandoor & Breads",
    groups: [
      {
        title: "Tandoori Specials",
        availability: "Served 5 PM to 11 PM",
        items: [
          v("Malai Broccoli Tikka", 6),
          v("Paneer Tikka", 7),
          v("Soya Tikka", 7),
          n("Chicken Tikka", 8),
          n("Hariyali Chicken Tikka", 8, true),
          n("Malai Chicken Tikka", 8),
          n("Chicken Wings", 8, true),
          n("Chicken Platter", 12, false, "with bone"),
          n("Mixed Platter", 14, false, "with bone"),
          n("Tandoori Chicken (Half)", 8),
          n("Tandoori Chicken (Full)", 12),
        ],
      },
      {
        title: "Roti & Naans",
        availability: "Served 5 PM to 11 PM",
        items: [
          v("Tandoori Roti", 2),
          v("Plain Naan", 2),
          v("Butter Naan", 2),
          v("Garlic Naan", 2),
          v("Chilli Naan", 2, true),
          v("Cheese Naan", 2.5),
          v("Special Naan", 3),
        ],
      },
      {
        title: "Breads",
        availability: "Available all day",
        items: [v("Phulka", 2), v("Chapati", 2), v("Plain Parotta", 3), v("Poori", 2)],
      },
    ],
  },
  {
    id: "biryani",
    label: "Biryani & Pulao",
    groups: [
      {
        title: "Biryani (Non-Veg)",
        availability: "Available all day",
        items: [
          n("Hyderabadi Chicken Dum Biryani", 10),
          n("Chicken Kheema Biryani", 10),
          n("Chicken Kebab Biryani", 10),
          n("Chicken Fry Piece Biryani", 10),
          n("Chicken Tikka Biryani", 10),
          n("Tandoori Chicken Biryani", 10),
          n("Double Masala Tandoori Chicken Biryani", 10, true),
          n("Mutton Fry Piece Biryani", 12),
          n("Mutton Kebab Biryani", 12),
          n("Mutton Kheema Biryani", 12),
          n("Prawn Biryani", 12),
          n("Fish Biryani", 12),
        ],
      },
      {
        title: "Biryani (Veg)",
        availability: "Available all day",
        items: [
          v("Mixed Veg Biryani", 8),
          v("Mushroom Biryani", 8),
          v("Paneer Biryani", 8),
          v("Soya Kebab Biryani", 9),
          v("Jackfruit Biryani", 9),
          v("Veg Kofta Biryani", 9),
        ],
      },
      {
        title: "Pulao (Non-Veg)",
        availability: "Available all day",
        items: [
          n("Chicken Kheema Pulao", 9),
          n("Chicken Kebab Pulao", 9),
          n("Chicken Fry Piece Pulao", 9),
          n("Chicken Tikka Pulao", 9),
          n("Tandoori Chicken Pulao", 9),
          n("Double Masala Tandoori Chicken Pulao", 10, true),
          n("Mutton Fry Piece Pulao", 10),
          n("Mutton Kebab Pulao", 10),
          n("Mutton Kheema Pulao", 10),
          n("Prawn Pulao", 10, true),
        ],
      },
      {
        title: "Pulao (Veg)",
        availability: "Available all day",
        items: [
          v("Mixed Veg Pulao", 7),
          v("Mushroom Pulao", 7),
          v("Paneer Pulao", 8),
          v("Soya Kebab Pulao", 8),
          v("Jackfruit Pulao", 8),
          v("Veg Kofta Pulao", 8),
        ],
      },
    ],
  },
  {
    id: "rice-noodles",
    label: "Rice & Noodles",
    groups: [
      {
        title: "Rice",
        availability: "Available all day",
        items: [
          v("Plain Rice", 3),
          v("Jeera Rice", 4),
          v("Ghee Rice", 4),
          v("Lemon Rice", 4),
          v("Vegetable Rice", 4),
          v("Paneer Rice", 5),
          v("Kaju Paneer Rice", 6),
          n("Double Egg Rice", 6),
          n("Chicken Egg Fried Rice", 7, true),
          n("Prawn Fried Rice", 9, true),
          n("Mixed Fried Rice", 9, true),
        ],
      },
      {
        title: "Noodles",
        availability: "Available all day",
        items: [
          v("Mushroom Noodles", 7),
          v("Mixed Veg Noodles", 7),
          v("Paneer Noodles", 7),
          n("Double Egg Noodles", 7),
          n("Chicken Noodles", 7),
          n("Chicken Egg Noodles", 8, true),
          n("Prawn Noodles", 10, true),
          n("Mixed Noodles", 10, true),
        ],
      },
    ],
  },
  {
    id: "sweets-drinks",
    label: "Sweets & Drinks",
    groups: [
      {
        title: "Sweets",
        availability: "Available all day",
        items: [v("Double Ka Meetha", 5), v("Gajar Ka Halwa", 5), v("Gulab Jamun with Rabdi", 5)],
      },
      {
        title: "Drinks",
        availability: "Available all day",
        items: [
          v("Masala Tea", 2),
          v("Indian Coffee", 3),
          v("Badam Milk", 3),
          v("Horlicks", 3),
          v("Bournvita", 3),
          v("Coke", 2),
          v("Diet Coke", 2),
          v("Pepsi", 2),
          v("Thums Up", 2),
        ],
      },
    ],
  },
  {
    id: "kids",
    label: "Kids Corner",
    groups: [
      {
        title: "Kids Corner",
        items: [
          v("French Fries", 3),
          v("Mozzarella Sticks with Fries", 4),
          n("Chicken Nuggets with Fries", 4),
        ],
      },
    ],
  },
];

export const formatPrice = (price: number) =>
  `£${Number.isInteger(price) ? price : price.toFixed(2)}`;

const MENU_INDEX = new Map(
  MENU_TABS.flatMap((tab) => tab.groups.flatMap((group) => group.items)).map((item) => [item.name, item]),
);

export const findMenuItem = (name: string) => MENU_INDEX.get(name);
