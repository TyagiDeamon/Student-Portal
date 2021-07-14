import express from "express";
import Teacher from "../models/Teacher.js";
import Student from "../models/student_schema.js";
const router = express.Router();

router.get("/:username", async (req, res) => {
	try {
		const teacher = await Teacher.findOne({
			username: req.params.username,
		});
		res.json(teacher);
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
});

router.post("/removeStudent", async (req, res) => {
	const request = {
		username: req.body.username,
		roll: req.body.roll,
	};
	try {
		const student = await Student.findOne({
			roll: request.roll,
		});

		if (!student) {
			res.status(404).send("Student not found");
			return;
		}

		const teacher = await Teacher.findOne({ username: request.username });

		var i = student.scores.length;

		while (i--) {
			if (student.scores[i].subject == teacher.subject) {
				break;
			}
		}
		if (i < 0) {
			res.status(400).send(
				`Roll No: ${student.roll} isn't enrolled in your subject.`
			);
			return;
		}

		student.scores.splice(i, 1);
		await student.save();

		var j = teacher.students.length;

		while (j--) {
			if (teacher.students[j].roll == request.roll) {
				break;
			}
		}
		teacher.students.splice(j, 1);
		await teacher.save();

		res.status(200).json(teacher);
	} catch (err) {
		console.log(err);
		res.send(err.message);
	}
});

router.post("/addStudent", async (req, res) => {
	const request = {
		username: req.body.username,
		roll: req.body.roll,
	};
	try {
		const student = await Student.findOne({
			roll: request.roll,
		});
		if (!student) {
			res.status(404).send("Student not found");
			return;
		}
		const teacher = await Teacher.findOne({ username: request.username });

		var j = teacher.students.length;

		while (j--) {
			if (teacher.students[j].roll == student.roll) {
				break;
			}
		}
		if (j >= 0) {
			res.status(400).send(`Roll No: ${student.roll} is already added!`);
			return;
		}
		teacher.students.push({
			name: student.name,
			roll: student.roll,
		});
		await teacher.save();

		student.scores.push({
			subject: teacher.subject,
		});
		await student.save();

		res.status(200).json(teacher);
	} catch (err) {
		console.log(err);
		res.send(err.message);
	}
});

export default router;
