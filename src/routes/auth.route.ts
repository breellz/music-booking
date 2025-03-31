import { Router } from "express";
import { signUp, signIn } from "../controller/auth.controller";

const authRouter = Router();

// Sign Up
authRouter.post("/sign-up", signUp);

// Sign In
authRouter.post("/sign-in", signIn);

export { authRouter };
