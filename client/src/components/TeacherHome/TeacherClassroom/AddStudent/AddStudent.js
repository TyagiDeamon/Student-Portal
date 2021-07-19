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

export default function AddStudent() {
	let storedEmail = localStorage.getItem("teacher");
	let savedEmail = JSON.parse(storedEmail);

	let storedClass = localStorage.getItem("class");
	let savedClass = JSON.parse(storedClass);

	const classes = useStyles();

	const [student, setStudent] = useState({
		email: "",
	});

	const addStudent = async () => {
		if (!savedEmail || !savedClass) {
			alert("Please login to continue");
			return;
		}
		const query = {
			teacherEmail: savedEmail,
			classname: savedClass,
			email: student.email,
		};

		var finalRes = "";

		try {
			await axios.post(
				"https://student---portal.herokuapp.com/teacher/addStudent",
				query
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes === "") {
			alert("Student added successfully");
			window.location.reload(false);
		} else {
			alert(finalRes);
		}
	};
	return (
		<>
			<h4>Add Student</h4>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="filled-full-width"
					label="Enter student's email"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={student.email}
					onChange={(event) => {
						setStudent({
							...student,
							email: event.target.value,
						});
					}}
				/>

				<Button
					variant="contained"
					onClick={addStudent}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Add
				</Button>
			</form>
		</>
	);
}
