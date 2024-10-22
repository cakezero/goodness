import jwt from 'jsonwebtoken'
import { officer } from '../models/models'
import ENV from "../utils/env.js"

const requireAuth = (req, res, next) => {
    const token = req.cookies.auth_cookie;

    if (!token) return res.status(400).redirect('/user/police')

    return jwt.verify(token, ENV.JWT_SECRET, async (err, decodedToken) => {
        if (err) throw new Error('Error with the cookie token!');
        next();
    });
};

const checkOfficer = async (req, res, next) => {
    const token = req.cookies.auth_cookie;
    try {
        const officer = await checkForOfficer(token);
        res.locals.user = officer;
        next();
    } catch (error) {
        res.locals.user = null;
        next();
    }
}


const checkForOfficer = async (token) => {
    if (!token) throw new Error("token is invalid or does not exist!")
    return jwt.verify(token, ENV.JWT_SECRET, async (err, decodedToken) => {
        if (err) throw new Error('Error with the cookie token!')
        
        const user = await officer.findById(decodedToken.id)
        if (!user) throw new Error("Officer id does not exist!")

        return user;
    })
}



export { requireAuth, checkOfficer, checkForOfficer }