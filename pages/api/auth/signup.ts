import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "./util";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      body: { firstName, lastName, email, phone, city, password },
    } = req;

    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(firstName, { min: 1, max: 20 }),
        errorMessage: "First name is Invalid",
      },
      {
        valid: validator.isLength(lastName, { min: 1, max: 20 }),
        errorMessage: "Last name is Invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is Invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is Invalid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is Invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is Invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: "Email is associated with another account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        city,
        password: hashedPassword,
      },
    });

    const token = await generateToken(user.email);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    console.log(user);

    return res
      .status(200)
      .json({
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        city: user.city,
        phone: user.phone,
      });
  }
}
