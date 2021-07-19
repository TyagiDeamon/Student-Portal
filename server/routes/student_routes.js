import express from "express";
import {
	getStudents,
	addStudent,
	deleteStudent,
	getStudentByEmail,
	updateMarks
} from "../controllers/student_controller.js";

const router = express.Router();

router.get("/", getStudents);

router.get("/:email", getStudentByEmail);

router.post("/", addStudent);

router.delete("/:id", deleteStudent);

router.put("/updateMarks", updateMarks);

export default router;
