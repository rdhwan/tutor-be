import Express from "express";
import barangRouter from "@/barang/route";
import env from "@/utils/env";

import dotenv from "dotenv";

// Baca .env file
dotenv.config();

const app = Express();

// middleware JSON
app.use(Express.json());

// [Route Declarations]
app.use("/barang", barangRouter);

app.listen(env.APP_PORT, () => {
  console.log(`Server is running on port ${env.APP_PORT}`);
});
