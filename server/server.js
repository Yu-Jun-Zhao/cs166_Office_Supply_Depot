import express from "express";
import cors from "cors";
import products from "./routes/product";
import user from "./routes/user";
import cart from "./routes/cart";
import order from "./routes/order";

const app = express();
app.use(express.json());

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

// ADD ROUTES
app.use("/api/products", products);
app.use("/api/user", user);
app.use("/api/cart", cart);
app.use("/api/order", order);

app.listen(8000, () => {
  console.log(`Resource Server Ready on port 8000`);
});