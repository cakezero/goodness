import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import path, { dirname } from "path";
import { connectDb } from "./src/config/db.js";
import userRoute from "./src/routes/routes.js";
import authRoute from './src/routes/auth.js'
import { fileURLToPath } from "url";
import { checkOfficer } from "./src/middlewares/auth.js";
import ENV from "./src/utils/env.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();


// Middlewares
app.set("views",path.resolve(__dirname, './src/views'), 'views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'self'", "'unsafe-inline'"],
    },
  })
);

// Routes
app.use("*", checkOfficer);
app.use("/", userRoute);
app.use('/user', authRoute);

// Port config
const port = ENV.PORT || 8000;

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
	connectDb();
});
