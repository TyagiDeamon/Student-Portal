import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "25ch",
	},
}));

export default function StudentSignup() {
	let stored = localStorage.getItem(window.location);
	let saved = JSON.parse(stored);

    const classes = useStyles();
	const [student, setStudent] = useState({
		name: "",
		password: "",
		password2: "",
		teacherUsername: saved,
		subject: "",
        roll: "",
	});

	const createStudent = () => {
		if (!saved) {
			alert("Please login to continue");
			return;
		}
		axios
			.post("http://localhost:5000/authStudent/register", student)
			.then(function () {
                window.location.reload(false);
			});
	};
	return (
		<>
			<h2>Create Student</h2>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="filled-full-width"
					label="Name"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={student.name}
					onChange={(event) => {
						setStudent({
							...student,
							name: event.target.value,
						});
					}}
				/>
				<TextField
					id="filled-full-width"
					label="Roll No"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={student.roll}
					onChange={(event) => {
						setStudent({
							...student,
							roll: event.target.value,
						});
					}}
				/>
				<TextField
					id="filled-full-width"
					label="Create password"
					type="password"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={student.password}
					onChange={(event) => {
						setStudent({
							...student,
							password: event.target.value,
						});
					}}
				/>
				<TextField
					id="filled-full-width"
					label="Confirm password"
					type="password"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={student.password2}
					onChange={(event) => {
						setStudent({
							...student,
							password2: event.target.value,
						});
					}}
				/>

				<Button
					variant="contained"
					onClick={createStudent}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Create
				</Button>
			</form>
		</>
	);
}
