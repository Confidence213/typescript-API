import { Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";
import { getRepository } from "typeorm";

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
}

export default new AuthController();
