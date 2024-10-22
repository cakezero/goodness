import { officer } from "../models/models.js";
import jwt from "jsonwebtoken";
import ENV from "../utils/env.js";

const maxAge = 1 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, ENV.JWT_SECRET, { expiresIn: maxAge });
};

const policeLogin = (req, res) => {
  return res.render("policeLogin");
};

const policeLoginPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log(req.body);
    const police = await officer.findOne({ email });
    if (!police)
      return res.status(404).json({ error: "police officer does not exist!" });

    if (password !== police.password)
      return res
        .status(400)
        .json({ error: "Login credentials does not match!" });

    const token = createToken(police._id);
    res.cookie("auth_cookie", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res.status(200).redirect("/police/dashboard");
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error: "Internal server error" });
  }
};

const vioLogin = (req, res) => {
  return res.render("vioLogin");
};

const vioLoginPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vio = await officer.findOne({ email });
    if (!vio)
      return res.status(404).json({ error: "vio officer does not exist!" });

    if (password !== vio.password)
      return res
        .status(400)
        .json({ error: "Login credentials does not match!" });

    const token = createToken(vio._id);
    res.cookie("auth_cookie", token, { httpOnly: true, maxAge: maxAge * 1000 });
    return res
      .status(200)
      .redirect("/vio/dashboard");
  } catch (error) {
    logger.error(`Error during login: ${error}`);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logout = (req, res) => {
  res.cookie("auth_cookie", "", { maxAge: 1 });
  res.redirect("/");
}

export { vioLogin, vioLoginPost, policeLogin, policeLoginPost, logout };
