import Header from "./components/Header";
import SearchSideBar from "./components/SearchSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, PrismaClient, Location, PRICE } from "@prisma/client";

interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: PRICE;
}
export interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
}

const prisma = new PrismaClient();

const fetchRestaurantsByCity = async ({
  city,
  cuisine,
  price,
}: SearchParams): Promise<Restaurant[]> => {
  return prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
    },
    where: {
      location: { name: { contains: city } },
      cuisine: { name: { contains: cuisine } },
      price: price,
    },
  });
};

const fetchLocations = async (): Promise<Location[]> => {
  return prisma.location.findMany();
};

const fetchCuisines = async (): Promise<Cuisine[]> => {
  return prisma.cuisine.findMany();
};

const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
  const restaurants = await fetchRestaurantsByCity(searchParams);

  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
