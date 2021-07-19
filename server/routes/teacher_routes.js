import express from "express";

import {
	getTeacherByEmail,
	removeStudent,
	addStudent,
	createClass,
	updateMarks,
	deleteClass,
} from "../controllers/teacher_controller.js";

const router = express.Router();

router.get("/:email", getTeacherByEmail);

router.post("/removeStudent", removeStudent);

router.post("/addStudent", addStudent);

router.post("/createClass", createClass);

router.put("/updateMarks", updateMarks);

router.post("/deleteClass", deleteClass);

export default router;
