import cors from "cors";
import express from "express";
import { mongodb_connect } from "./database";
import { errorHandler, notFoundHandler } from "./middlewares/errorHander";
import productCartRoutes from "./routes/cartRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import { PORT } from "./secret";
const app = express();
mongodb_connect();
//setup external middileware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//setup custom middleware
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", productCartRoutes);

app.get("/", (req, res) => {
  res.send("this store api home page!😊");
});

//global error handler for every request
app.use(notFoundHandler);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`The server is running at port http://localhost:${PORT}`);
});
