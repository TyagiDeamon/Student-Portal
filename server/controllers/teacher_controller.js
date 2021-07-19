import Teacher from "../models/Teacher.js";
import Student from "../models/student_schema.js";

export const getTeacherByEmail = async (req, res) => {
	try {
		const teacher = await Teacher.findOne({
			email: req.params.email,
		});
		res.status(200).json(teacher);
	} catch (err) {
		console.log(err);
		res.send({ email: err });
	}
};

export const removeStudent = async (req, res) => {
	try {
		const teacher = await Teacher.findOne({ email: req.body.teacherEmail });

		teacher.classes.map(async (item) => {
			if (item.className == req.body.classname) {
				try {
					let x = false;
					let j = item.students.length;

					while (j--) {
						if (item.students[j].roll == req.body.roll) {
							x = true;
							break;
						}
					}

					if (!x) {
						res.status(404).send("Student not found");
						return;
					}

					const student = await Student.findOne({
						email: item.students[j].email,
					});
					let i = student.scores.length;

					while (i--) {
						if (student.scores[i].subject == teacher.subject) {
							break;
						}
					}

					student.scores.splice(i, 1);
					await student.save();

					item.students.splice(j, 1);

					await item.students.sort((a, b) => {
						let fa = a.name,
							fb = b.name;

						if (fa < fb) {
							return -1;
						}
						if (fa > fb) {
							return 1;
						}
						return 0;
					});
					item.students.map((value, index) => (value.roll = index + 1));
					await teacher.save();

					res.status(200).json(teacher);
				} catch (err) {
					console.log(err);
					res.status(404).json(err);
				}
			}
		});
	} catch (err) {
		console.log(err);
		res.send(err.message);
	}
};

export const addStudent = async (req, res) => {
	try {
		const student = await Student.findOne({
			email: req.body.email,
		});
		if (!student) {
			res.status(404).send("Student not found");
			return;
		}
		const teacher = await Teacher.findOne({ email: req.body.teacherEmail });

		teacher.classes.map(async (item) => {
			let x = false;
			if (item.className == req.body.classname) {
				try {
					let l = item.students.length;
					while (l--) {
						if (item.students[l].email == req.body.email) {
							x = true;
							break;
						}
					}

					if (x) {
						res.status(404).send("Student is already in your class");
						return;
					}

					if (!x) {
						await item.students.push({
							name: student.name,
							email: student.email,
						});

						await item.students.sort((a, b) => {
							let fa = a.name,
								fb = b.name;

							if (fa < fb) {
								return -1;
							}
							if (fa > fb) {
								return 1;
							}
							return 0;
						});

						item.students.map((value, index) => (value.roll = index + 1));

						await teacher.save();

						student.scores.push({ subject: teacher.subject });

						await student.save();

						res.status(200).json(teacher);
					}
				} catch (err) {
					res.status(404).json({ message: err.message });
					return;
				}
			}
		});
	} catch (err) {
		res.status(404).json({ message: err.message });
		console.log(err.message);
		// res.send(err.message);
	}
};

export const createClass = async (req, res) => {
	if (req.body.classname === "") {
		return res.status(404).send("Bad request");
	}
	try {
		const teacher = await Teacher.findOne({
			email: req.body.teacherEmail,
		});
		if (!teacher) {
			res.status(404).send("Bad request");
			return;
		}
		let x = false;
		teacher.classes.map((item) => {
			if (item.className == req.body.classname) {
				x = true;
				res.status(404).send("Class already exists");
				return;
			}
		});
		if (x) {
			return;
		}
		teacher.classes.push({ className: req.body.classname, students: [] });

		await teacher.save();
		res.status(200).json(teacher);
	} catch (err) {
		console.log(err);
		res.send(err.message);
	}
};

export const updateMarks = async (req, res) => {
	try {
		const teacher = await Teacher.findOne({ email: req.body.teacherEmail });

		teacher.classes.map(async (item) => {
			let x = false;
			if (item.className == req.body.classname) {
				try {
					let l = item.students.length;
					while (l--) {
						if (item.students[l].roll == req.body.roll) {
							x = true;
							break;
						}
					}

					if (!x) {
						res.status(400).send("Roll No not found");
						return;
					}

					if (x) {
						if (req.body.term == "term1") {
							item.students[l].term1 = req.body.marks;
						}
						if (req.body.term == "term2") {
							item.students[l].term2 = req.body.marks;
						}
						if (req.body.term == "term3") {
							item.students[l].term3 = req.body.marks;
						}
						if (req.body.term == "term4") {
							item.students[l].term4 = req.body.marks;
						}

						item.students[l].total =
							item.students[l].term1 +
							item.students[l].term2 +
							item.students[l].term3 +
							item.students[l].term4;

						await teacher.save();

						const student = await Student.findOne({
							email: item.students[l].email,
						});

						student.scores.map((value) => {
							if (value.subject == teacher.subject) {
								if (req.body.term == "term1") {
									value.marks.term1 = req.body.marks;
								}
								if (req.body.term == "term2") {
									value.marks.term2 = req.body.marks;
								}
								if (req.body.term == "term3") {
									value.marks.term3 = req.body.marks;
								}
								if (req.body.term == "term4") {
									value.marks.term4 = req.body.marks;
								}

								value.marks.total =
									value.marks.term1 +
									value.marks.term2 +
									value.marks.term3 +
									value.marks.term4;
							}
						});

						await student.save();

						res.status(200).json(teacher);
					}
				} catch (err) {
					res.status(404).json({ message: err.message });
					return;
				}
			}
		});
	} catch (err) {
		res.status(404).json(err);
	}
};

export const deleteClass = async (req, res) => {
	try {
		const teacher = await Teacher.findOne({ email: req.body.teacherEmail });

		let i = teacher.classes.length;

		while (i--) {
			if (teacher.classes[i].className == req.body.classname) {
				break;
			}
		}

		if (i < 0) {
			res.status(400).send("Class not found");
			return;
		}

		if (teacher.classes[i].students.length > 0) {
			res
				.status(404)
				.send(
					"There are students in class. Please remove them first and try again."
				);
			return;
		}

		teacher.classes.splice(i, 1);

		await teacher.save();

		res.status(200).json(teacher);
	} catch (err) {
		console.log(err);
		res.send(err.message);
	}
};