import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import useStyles from "../../../../style";

export default function DeleteClass() {
	let storedEmail = localStorage.getItem("teacher");
	let savedEmail = JSON.parse(storedEmail);

	const classes = useStyles();

	const [query, setQuery] = useState({
		teacherEmail: savedEmail,
		classname: "",
	});

	var finalRes = "";

	const deleteClass = async () => {
		if (!savedEmail) {
			alert("Please login to continue");
			return;
		}

		try {
			await axios.post(
				"https://student---portal.herokuapp.com/teacher/deleteClass",
				query
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes === "") {
			alert(`Successfully removed Class: ${query.classname}`);
			window.location.reload(false);
		} else {
			alert(finalRes);
		}
	};
	return (
		<>
			<h4>Delete Class</h4>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="outlined-basic"
					label="Enter class name"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={query.classname}
					onChange={(event) => {
						setQuery({
							...query,
							classname: event.target.value,
						});
					}}
				/>

				<Button
					variant="contained"
					onClick={deleteClass}
					className={classes.openButton}
				>
					Delete
				</Button>
			</form>
		</>
	);
}
