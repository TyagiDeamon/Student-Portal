import Student from "../models/student_schema.js";
import Teacher from "../models/Teacher.js";

export const getStudents = async (req, res) => {
	try {
		const allStudents = await Student.findOne({ email: req.body });

		res.status(200).json(allStudents);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getStudentByEmail = async (req, res) => {
	try {
		const student = await Student.findOne({ email: req.params.email });
		res.status(200).json(student);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const addStudent = async (req, res) => {
	try {
		const newStudent = new Student({
			roll: req.body.roll,
			name: req.body.name,
			grade: req.body.grade,
		});

		await newStudent.save();
		res.status(201).json(newStudent);
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

export const deleteStudent = async (req, res) => {
	const id = req.params.id;

	try {
		await Student.findByIdAndDelete(id).exec();
		res.send("Successfully Deleted!");
	} catch (error) {
		res.status(404).json({ message: err.message });
	}
};

export const updateMarks = async (req, res) => {
	const request = {
		username: req.body.username,
		roll: req.body.roll,
		marks: req.body.marks,
		term: req.body.term,
	};
	try {
		const student = await Student.findOne({
			roll: request.roll,
		});

		const teacher = await Teacher.findOne({ username: request.username });

		student.scores.map((item) => {
			if (item.subject == teacher.subject) {
				const q = request.term;

				if (q == "term1") {
					item.marks.term1 = request.marks;
				}
				if (q == "term2") {
					item.marks.term2 = request.marks;
				}
				if (q == "term3") {
					item.marks.term3 = request.marks;
				}
				if (q == "term4") {
					item.marks.term4 = request.marks;
				}

				item.marks.total =
					item.marks.term1 +
					item.marks.term2 +
					item.marks.term3 +
					item.marks.term4;
			}
		});

		await student.save();

		teacher.students.map((item) => {
			if (item.roll == request.roll) {
				const q = request.term;

				if (q == "term1") {
					item.marks.term1 = request.marks;
				}
				if (q == "term2") {
					item.marks.term2 = request.marks;
				}
				if (q == "term3") {
					item.marks.term3 = request.marks;
				}
				if (q == "term4") {
					item.marks.term4 = request.marks;
				}

				item.marks.total =
					item.marks.term1 +
					item.marks.term2 +
					item.marks.term3 +
					item.marks.term4;
			}
		});

		await teacher.save();

		res.json(teacher);
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
};

export default getStudents;
