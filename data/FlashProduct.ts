export interface FlashProducts {
  name: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
}
export const products: FlashProducts[] = [
  {
    name: "Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-40%",
    rating: 4.5,
    reviews: 88,
    image: "/N6.jpg",
  },
  {
    name: "Keyboard",
    price: "$960",
    oldPrice: "$1160",
    discount: "-35%",
    rating: 4,
    reviews: 75,
    image: "/n2.jpg",
  },
  {
    name: "Monitor",
    price: "$370",
    oldPrice: "$400",
    discount: "-30%",
    rating: 5,
    reviews: 99,
    image: "/n4.jpg",
  },
  {
    name: "Chair",
    price: "$375",
    oldPrice: "$400",
    discount: "-25%",
    rating: 3.5,
    reviews: 45,
    image: "/n1.jpg",
  },
];
