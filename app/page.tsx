import { Inter } from "@next/font/google";

import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

import { PrismaClient, Cuisine, Location, PRICE, Review } from "@prisma/client";

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  slug: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      slug: true,
      price: true,
      cuisine: true,
      location: true,
      reviews: true,
    },
  });

  return restaurants;
};

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </main>
  );
}
