import express from "express";
import {
  addOfficer,
  addDriver,
  home,
  policeDashboard,
  vioDashboard,
  search,
  add_penality,
} from "../controllers/controllers.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router
  .get("/", home)
  .get("/police/dashboard", requireAuth, policeDashboard)
  .get("/vio/dashboard", requireAuth, vioDashboard)
  .post("/search", requireAuth, search)
  .post("/add-penality", requireAuth, add_penality)
  .post("/add-officer", addOfficer)
  .get("/add-plate-number", requireAuth, addDriver);

export default router;