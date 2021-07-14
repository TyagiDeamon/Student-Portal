import express from "express";
const router = express.Router();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import validateRegisterData from "../../Auth_teacher/register.js";
import validateLoginData from "../../Auth_teacher/login.js";

import Teacher from "../../models/Teacher.js";

import keys from "../../config/keys.js"

router.post("/register", (req, res) => {
	//form validation

	const { errors, isValid } = validateRegisterData(req.body);

	if (!isValid) {
		return res.status(404).json(errors);
	}

	Teacher.findOne({ username: req.body.username }).then((teacher) => {
		if (teacher) {
			return res
				.status(400)
				.json({ username: "Username already exists" });
		} else {
			const newTeacher = new Teacher({
				username: req.body.username,
				subject: req.body.subject,
				password: req.body.password,
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newTeacher.password, salt, (err, hash) => {
					if (err) throw err;
					newTeacher.password = hash;
					newTeacher
						.save()
						.then((teacher) => res.json(teacher))
						.catch((err) => console.log(err));
				});
			});
		}
	});
});

// @route POST api/users/login
// @desc Login teacher and return JWT token
// @access Public
router.post("/login", (req, res) => {
	// Form validation
	const { errors, isValid } = validateLoginData(req.body);

	// Check validation
	if (!isValid) {
		return res.status(400).send(errors);
	}

	const username = req.body.username;

	const password = req.body.password;

	Teacher.findOne({ username }).then((teacher) => {
		if (!teacher) {
			return res.status(404).send({ username: "Username not found" });
		}
		// Check password
		bcrypt.compare(password, teacher.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: teacher.id,
					username: teacher.username,
				}; // Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926, // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token,
						});
					}
				);
			} else {
				return res
					.status(400)
					.send({ password: "Password incorrect" });
			}
		});
	});
});

export default router;