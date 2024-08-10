import express from "express";
import { routes } from "./routes/router.js";

const app = express();

// app.get("/ping", (_, res) => {
//     res.send("This is working");
// });

// middleware to handle json format
app.use(express.json());

app.use("/", routes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});