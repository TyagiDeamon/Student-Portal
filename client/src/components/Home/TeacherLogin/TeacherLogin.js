import React, { useState, useEffect } from "react";
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

export default function TeacherLogin() {
	

	const classes = useStyles();
	const [teacher, setTeacher] = useState({
		username: "",
		password: "",
	});
	// const [finalRes, setfinalRes] = useState({
	// 	username: "",
	// 	password: "",
	// });

	let finalRes = {};

	
	const loginTeacher = async () => {
		try {
			await axios.post(
				"http://localhost:5000/authTeacher/login",
				teacher
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes.username)
		{
			alert(finalRes.username);
		}
		else if (finalRes.password)
		{
			alert(finalRes.password);
		}
		else
		{
			localStorage.setItem(
				`http://localhost:3000/teacher/${teacher.username}`,
				JSON.stringify(teacher.username)
			);

				window.location = `http://localhost:3000/teacher/${teacher.username}`;
		}
	};
	
	return (
		<>
			<h2>Teacher Login</h2>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="filled-full-width"
					label="Username"
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
					id="filled-full-width"
					label="Password"
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

				<Button
					variant="contained"
					onClick={loginTeacher}
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
