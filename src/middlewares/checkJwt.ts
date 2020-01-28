import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../entity/User";

export const checkJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerToken = <string>req.headers["authorization"];
  let jwtPayload;
  try {
    if (!bearerToken) throw "No token supplied in header";
    let token = bearerToken.replace("Bearer ", "");

    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    let userRepository = getRepository(User);
    let user = <User>await userRepository.findOneOrFail({
      where: {
        id: jwtPayload.userId,
        username: jwtPayload.username
      }
    });
    res.locals.user = user;
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unauthorized"
    });
    return;
  }

  next();
};
