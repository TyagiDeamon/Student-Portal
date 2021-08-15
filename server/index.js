import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./routes/student_routes.js";
import teacherRoutes from "./routes/teacher_routes.js";
import passport from "passport";
import "./config/passport.js";
import "dotenv/config";
import authTeacher from "./routes/api/teachers.js";
import authStudent from "./routes/api/students.js";

const app = express();
// app.use(cors());

app.use(express.json({ limit: "20mb", extended: true }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(passport.initialize());

app.options("*", cors());
app.use("/student", cors(), studentRoutes);
app.use("/authTeacher", cors(), authTeacher);
app.use("/authStudent", cors(), authStudent);
app.use("/teacher", cors(), teacherRoutes);

app.get("/", (req, res) => {
	res.send("Welcome to Student Portal API");
});

mongoose.connect(
	process.env.mongoURI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => {
		console.log("Connected to MongoDB!");
	}
);

const server = app.listen(process.env.PORT || 5000, () => {
	const port = server.address().port;
	console.log(`Express is working on port ${port}`);
});
