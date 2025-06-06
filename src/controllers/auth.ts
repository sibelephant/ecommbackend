import { Response, Request, NextFunction } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { SignUpSchema } from "../schema/users";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    next(
      new BadRequestsException(
        "User already exists",
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
    return;
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    next(
      new BadRequestsException("User does not exist", ErrorCode.USER_NOT_FOUND)
    );
    return;
  }

  if (!compareSync(password, user.password)) {
    next(
      new BadRequestsException(
        "Incorrect password",
        ErrorCode.INCORRECT_PASSWORD
      )
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};
