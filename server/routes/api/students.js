import express from "express";
const router = express.Router();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import validateRegisterData from "../../Auth_student/register.js";
import validateLoginData from "../../Auth_student/login.js";

import Student from "../../models/student_schema.js";

router.post("/register", async (req, res) => {
	//form validation

	const { errors, isValid } = validateRegisterData(req.body);

	if (!isValid) {
		return res.status(404).send(errors);
	}

	Student.findOne({ email: req.body.email }).then(async (student) => {
		if (student) {
			return res
				.status(400)
				.send({ email: "Account already registered with this email" });
		} else {
			const newStudent = new Student({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				scores: [],
			});

			// Hash password before saving in database
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newStudent.password, salt, (err, hash) => {
					if (err) {
						console.log(err);
					}
					newStudent.password = hash;
					newStudent
						.save()
						.then((student) => res.json(student))
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

	const email = req.body.email;

	const password = req.body.password;

	Student.findOne({ email }).then((student) => {
		if (!student) {
			return res.status(404).send({ email: "Account not found" });
		}
		// Check password
		bcrypt.compare(password, student.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: student.id,
					email: student.email,
				}; // Sign token
				jwt.sign(
					payload,
					process.env.secretOrKey,
					{
						expiresIn: 86400, // 1 day in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							name: student.name,
							token: "Bearer " + token,
						});
					}
				);
			} else {
				return res.status(400).send({ password: "Incorrect password" });
			}
		});
	});
});

export default router;
