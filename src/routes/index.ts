import { Router } from "express";
import { artistRouter } from "./artist.route";
import { authRouter } from "./auth.route";
import { bookingRouter } from "./booking.route";
import { eventRouter } from "./event.route";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/artist", artistRouter);
apiRouter.use("/booking", bookingRouter);
apiRouter.use("/event", eventRouter);
