import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return res.status(400).json({ errorMessage: "Invalid data provided" });
  }

  const restaurant = await prisma.restaurant.findUnique({ where: { slug } });

  if (!restaurant) {
    return res.status(400).json({ errorMessage: "Invalid data provided" });
  }

  const date = new Date(`${day}T${time}`);
  const openTime = new Date(`${day}T${restaurant.open_time}`);
  const closeTime = new Date(`${day}T${restaurant.close_time}`);

  if (date < openTime || date > closeTime) {
    return res
      .status(400)
      .json({ errorMessage: "Restaurant is not open at that time" });
  }

  return res.status(200).json({ restaurant });
}
