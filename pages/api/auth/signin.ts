import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { generateToken } from "./util";
import validator from "validator";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      { valid: validator.isEmail(email), errorMessage: "Email is Invalid" },
      {
        valid: validator.isLength(password, { min: 6 }),
        errorMessage: "Password is invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      res.status(400).json({ errorMessage: errors[0] });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(401)
        .json({ errorMessage: "Email or Password is Invalid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Email or Password is Invalid" });
    }

    const token = await generateToken(user.email);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

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

  return res.status(404).json("unknown endpoint");
}
