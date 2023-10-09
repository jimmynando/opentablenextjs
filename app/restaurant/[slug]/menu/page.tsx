import { PrismaClient } from "@prisma/client";

import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    select: { items: true },
    where: { slug },
  });

  if (!restaurant) {
    throw new Error();
  }

  return restaurant.items;
};

const RestaurantMenu = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const menu = await fetchRestaurantMenu(slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={slug} />
      <Menu items={menu} />
    </div>
  );
};

export default RestaurantMenu;
