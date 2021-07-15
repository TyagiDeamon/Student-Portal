import express from "express";
const router = express.Router();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import validateRegisterData from "../../Auth_student/register.js";
import validateLoginData from "../../Auth_student/login.js";

import Student from "../../models/student_schema.js";
import Teacher from "../../models/Teacher.js";
// import keys from "../../config/keys.js";

router.post("/register", async (req, res) => {
	//form validation

	const teacher = await Teacher.findOne({
		username: req.body.teacherUsername,
	});

	const { errors, isValid } = validateRegisterData(req.body);

	if (!isValid) {
		return res.status(404).send(errors);
	}

	Student.findOne({ roll: req.body.roll }).then((student) => {
		if (student) {
			return res.status(400).send({ roll: "Roll No already exists" });
		} else {
			const newStudent = new Student({
				name: req.body.name,
				password: req.body.password,
				roll: req.body.roll,
				scores: [{
					subject: teacher.subject,
				}],
				
			});
			
			teacher.students.push({
				name: req.body.name,
				roll: req.body.roll,
			});
			teacher.save();

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

	const roll = req.body.roll;

	const password = req.body.password;

	Student.findOne({ roll }).then((student) => {
		if (!student) {
			return res
				.status(404)
				.send({ name: "Student not found" });
		}

		if (student.name != req.body.name) {
			return res.status(404).send({ name: "Name doesn't match with the provided Roll No" });
		}
		// Check password
		bcrypt.compare(password, student.password).then((isMatch) => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					id: student.id,
					roll: student.roll,
				}; // Sign token
				jwt.sign(
					payload,
					process.env.secretOrKey,
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
					.send({ passwordincorrect: "Password incorrect" });
			}
		});
	});
});

export default router;
