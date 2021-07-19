import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import useStyles from "../../../../style";

export default function CreateClass() {
	let storedEmail = localStorage.getItem("teacher");
	let savedEmail = JSON.parse(storedEmail);

	const classes = useStyles();

	const [newClass, setNewClass] = useState({
		teacherEmail: savedEmail,
		classname: "",
	});

	let finalRes = null;

	const createClass = async () => {
		if (!savedEmail) {
			alert("Please login to continue");
			return;
		}

		try {
			await axios.post(
				"https://student---portal.herokuapp.com/teacher/createClass",
				newClass
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes) {
			alert(finalRes);
		} else {
			alert(`Successfully created class ${newClass.classname}`);
			window.location.reload(false);
		}
	};

	return (
		<>
			<h4>Create class</h4>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="filled-full-width"
					label="Enter class name"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={newClass.classname}
					onChange={(event) => {
						setNewClass({ ...newClass, classname: event.target.value });
					}}
				/>

				<Button
					variant="contained"
					onClick={createClass}
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
