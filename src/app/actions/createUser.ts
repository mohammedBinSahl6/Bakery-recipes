"use server";

import { hash } from "bcrypt";

import prisma from "@/lib/prisma";


export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const isEmailExist = await prisma.user.findUnique({
      where: { email },
    });

    if (isEmailExist)
      return {
        user: null,
        message: "Email already exists",
        status: 409,
      };

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...rest } = newUser;

    return {
      user: rest,
      message: "Das Spieler-Konto wurde angelegt!",
      status: 201,
    };
  } catch (error) {
    return { message: `internal server error ${error}`, status: 500 };
  }
}
