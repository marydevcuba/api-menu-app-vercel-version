import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
//All routes import
import { offerRouter } from "./routes/v1/offer.routes.js";
import { categoryRouter } from "./routes/v1/category.routes.js";
import { businessRouter } from "./routes/v1/business.routes.js";
import { authRouter } from "./routes/v1/authRoutes.routes.js";
import { userRouter } from "./routes/v1/users.routes.js";
import { imageUrlRouter } from "./routes/v1/imageUrl.routes.js";
import { reviewRouter } from "./routes/v1/review.routes.js";
import cookieParser from "cookie-parser";
import { starsRouter } from "./routes/v1/stars.routes.js";
import { businessCategoryRouter } from "./routes/v1/businessCategory.routes.js";
import { offerCategoryRouter } from "./routes/v1/offerCategory.routes.js";

const app = express();
app.use(cors());
app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Environment PORT config
 */
const PORT = process.env.PORT;

/**
 * Routes
 */
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/offers", offerRouter);
app.use("/api/v1/business", businessRouter);
app.use("/api/v1/businesscategory", businessCategoryRouter);
app.use("/api/v1/offercategory", offerCategoryRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/stars", starsRouter);
app.use("/api/v1/images", imageUrlRouter);

app.use((req: Request, res: Response) => {
  res.status(404).send("404 - No se encuentra la ruta especificada");
});
/**
 * Listen App
 */
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});

export default app;
