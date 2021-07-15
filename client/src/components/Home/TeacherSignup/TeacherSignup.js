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

export default function TeacherSignup() {
	const classes = useStyles();
	const [teacher, setTeacher] = useState({
		username: "",
		password: "",
		password2: "",
		subject: "",
	});

	let finalRes = {};
	
	const createTeacher = async () => {
		try {
			await axios.post(
				"https://student---portal.herokuapp.com/authTeacher/register",
				teacher
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes.username) {
			alert(finalRes.username);
		} else if (finalRes.password) {
			alert(finalRes.password);
		} else if (finalRes.password2) {
			alert(finalRes.password2);
		} else if (finalRes.subject) {
			alert(finalRes.subject);
		} else {
			alert("Successful! Please login to continue");

			window.location.reload(false);
		}
	};
	return (
		<>
			<h2>Teacher Signup</h2>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					label="Create Username"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={teacher.username}
					onChange={(event) => {
						setTeacher({
							...teacher,
							username: event.target.value,
						});
					}}
				/>
				<TextField
					label="Subject"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={teacher.subject}
					onChange={(event) => {
						setTeacher({
							...teacher,
							subject: event.target.value,
						});
					}}
				/>
				<TextField
					label="Create password"
					type="password"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={teacher.password}
					onChange={(event) => {
						setTeacher({
							...teacher,
							password: event.target.value,
						});
					}}
				/>
				<TextField
					label="Confirm password"
					type="password"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={teacher.password2}
					onChange={(event) => {
						setTeacher({
							...teacher,
							password2: event.target.value,
						});
					}}
				/>

				<Button
					variant="contained"
					onClick={createTeacher}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Sign Up
				</Button>
			</form>
		</>
	);
}
