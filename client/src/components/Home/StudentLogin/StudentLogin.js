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

export default function StudentLogin() {
	const classes = useStyles();
	const [student, setStudent] = useState({
		name: "",
		roll: "",
		password: "",
	});

	let finalRes = {};

	const loginStudent = async () => {
		try {
			await axios.post(
				"https://student---portal.herokuapp.com/authStudent/login",
				student
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes.name) {
			alert(finalRes.name);
		} else if (finalRes.roll) {
			alert(finalRes.roll);
		} else if (finalRes.password) {
			alert(finalRes.password);
		} else {
			localStorage.setItem(
				`https://kt-studentportal.netlify.app/student/${student.roll}`,
				JSON.stringify(student.roll)
			);
			window.location = `https://kt-studentportal.netlify.app/student/${student.roll}`;
		}
	};
	return (
		<>
			<h2>Student Login</h2>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
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
					label="Password"
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

				<Button
					variant="contained"
					onClick={loginStudent}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Login
				</Button>
			</form>
		</>
	);
}
