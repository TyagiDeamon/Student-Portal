import Teacher from "../models/Teacher.js";
import student from "../models/student_schema.js";

export const getStudents = async (req, res) => {
	try {
		const allStudents = await student.find();
		res.status(200).json(allStudents);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};