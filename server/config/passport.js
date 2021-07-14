import passportJwt from "passport-jwt";
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
import mongoose from "mongoose";
import Teacher from "../models/Teacher.js";
// import keys from "./keys.js";

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;
const passport= (passport) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			Teacher.findById(jwt_payload.id)
				.then((teacher) => {
					if (teacher) {
						return done(null, teacher);
					}
					return done(null, false);
				})
				.catch((err) => console.log(err));
		})
	);
};

export default passport;