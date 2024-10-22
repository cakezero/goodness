import { officer, penality, plateNumber } from "../models/models.js";
import { checkForOfficer } from "../middlewares/auth.js";

const home = (req, res) => {
  res.render("home");
};

const policeDashboard = async (req, res) => {
  const cookie = req.cookies.auth_cookie;
 
  try {
    const officer = await checkForOfficer(cookie);

    const foundPenalitys = await penality
      .find({ officer: officer._id })
      .sort({ _id: -1 });
    
    console.log({ foundPenalitys })
    if (!foundPenalitys || foundPenalitys.length === 0) return res.render("policeDashboard", { message: "hehe" });

    const driverInfos = await plateNumber.find({ officer: officer._id }).sort({ _id: -1 })
    console.log({ driverInfos })
    return res.render("policeDashboard", {
      message: null,
      foundPenalitys,
      driverInfos,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const vioDashboard = async (req, res) => {
  const cookie = req.cookies.auth_cookie;
  try {
    const penalityFound = await penality.find().sort({ _id: -1 });
    return res.render("vioDashboard", { penalityFound });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const search = async (req, res) => {
  const plate_number = req.body.plateNumber;
  console.log('seearch hit')
  try {
    const driver = await plateNumber.findOne({ plate_number });
    console.log({ driver })
    if(!driver) return res.status(404).json({ error: "not found" })
    return res.status(200).json({ info: driver });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const add_penality = async (req, res) => {
  const cookie = req.cookies.auth_cookie;
  const { id, description } = req.body;
  let date;
  console.log('penality hit')
  try {
    const newDate = new Date();
    const dateString = newDate.toString();
    if (dateString.toLowerCase().includes('thurs')) {
      date = dateString.slice(0, 17)
    } else {
      date = dateString.slice(0, 15)
    }
    const loggedInOfficer = await checkForOfficer(cookie);
    console.log({ loggedInOfficer })
    const checkedPlateNumber = await plateNumber.findById(id);
    console.log({ checkedPlateNumber })
    if (!checkedPlateNumber)
      return res.status(404).json({ error: "Plate number does not exist!" });

    const penalityCreated = await penality.create({
      plate_number: checkedPlateNumber.plate_number,
      driverName: checkedPlateNumber.driverName,
      description,
      date,
      officer: loggedInOfficer._id
    });

    console.log({ penalityCreated })
    return res
      .status(200)
      .json({ message: "plate number has been penalized!" });
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error });
  }
};

const addOfficer = async (req, res) => {
  try {
    await officer.create(req.body);
    return res.status(201).json({ message: 'officer created!' })
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error })
  }
}

const addDriver = async (req, res) => {
  const token = req.cookies.auth_cookie;
  console.log('hi')
  try {
    const user = await checkForOfficer(token)
    const { plate_number, driverName, driverPhoneNumber, driverAddress } = req.query;
    req.query.officer = user._id
    console.log({ obj: req.query })
    const driverToBeSaved = new plateNumber(req.query);
    await driverToBeSaved.save();
    return res.status(201).json({ message: 'driver created' })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error })
  }
}

export { addDriver, addOfficer, home, policeDashboard, vioDashboard, search, add_penality };