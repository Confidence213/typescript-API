import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { getRepository } from "typeorm";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

class AuthController {
  public async register(req: Request, res: Response) {
    let { username, password } = req.body;
    let user = new User();
    user.username = username;
    user.password = password;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();

    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      console.log(e);
      res.status(409).json({
        status: "error",
        message: "Username is already in use"
      });
      return;
    }

    //If all ok, send 201 response
    res.status(201).json({ status: "success", message: "User created" });
  }

  public async authenticate(req: Request, res: Response) {
    let { username, password } = req.body;
    const userRepository = getRepository(User);
    let user: User;

    try {
      if (!(username && password)) throw "Username and Password is required";

      //find user
      user = await userRepository.findOneOrFail({ where: { username } });

      //check if password is match
      if (!user.checkIfPasswordValid(password)) throw "Invalid password";
    } catch (error) {
      console.log(error);
      res.status(401).json({
        status: "error",
        message: "Username or Password is incorrect"
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: username
      },
      config.jwtSecret,
      { expiresIn: "1h" }
    );
    res.json({
      message: "success",
      token: token
    });
  }
}

export default new AuthController();
