import express from "express";
import exphbs from "express-handlebars";
import dotenv from "dotenv";

import { connectDB } from "./config/database.js";
import { initRoute } from "./routes/web-app/index.js";
import { initAPIs } from "./routes/api/index.js";

dotenv.config({ path: "src/config/.env" });

const app = express();
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

initRoute(app);
initAPIs(app);

app.use(express.static("src/public"));

// View engine
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "src/views");

app.listen(process.env.PORT || 2703, () => {
  console.log("listening on port 2703");
});
