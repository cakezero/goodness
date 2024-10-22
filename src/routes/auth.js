import express from 'express';
import {
  logout,
  policeLogin,
  policeLoginPost,
  vioLogin,
  vioLoginPost,
} from "../controllers/authcontroller.js";

const router = express.Router();

router
  .get('/police', policeLogin)
  .get('/vio', vioLogin)
  .post('/police', policeLoginPost)
  .post('/vio', vioLoginPost)
  .get('/logout', logout)

export default router;