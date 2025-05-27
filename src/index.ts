import express, { Express, NextFunction, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "./generated/prisma"; // Changed import path
import { errorMiddleWare } from "./middlewares/errors";
import { SignUpSchema } from "./schema/users";

const app: Express = express();
app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: ["query"],
})

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });
app.use(errorMiddleWare);
app.listen(PORT, () => {
  console.log(`the App is working in  port ${PORT}`);
});

