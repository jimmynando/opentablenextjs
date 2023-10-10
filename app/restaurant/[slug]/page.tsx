import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Rating from "./components/Rating";
import Description from "./components/Description";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import ReservationCard from "./components/ReservationCard";
import { PrismaClient, Review } from "@prisma/client";

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  images: string[];
  slug: string;
  reviews: Review[];
}

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (
  slug: string
): Promise<Restaurant | null> => {
  const restaurant = await prisma.restaurant.findUnique({
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      slug: true,
      reviews: true
    },
    where: {
      slug: slug,
    },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant;
};

const RestaurantDetails = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(slug);

  if (restaurant) {
    return (
      <>
        <div className="bg-white w-[70%] rounded p-3 shadow">
          <RestaurantNavBar slug={restaurant.slug} />
          <Title name={restaurant.name} />
          <Rating reviews={restaurant.reviews} />
          <Description description={restaurant.description}/>
          <Images images={restaurant.images}/>
          <Reviews reviews={restaurant.reviews} />
        </div>
        <div className="w-[27%] relative text-reg">
          <ReservationCard />
        </div>
      </>
    );
  }
};

export default RestaurantDetails;
