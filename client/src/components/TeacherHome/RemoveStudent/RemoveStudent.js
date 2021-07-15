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

let finalRes = null;

export default function RemoveStudent() {
	let stored = localStorage.getItem(window.location);
	let saved = JSON.parse(stored);

	const classes = useStyles();

	const [student, setStudent] = useState({
		roll: "",
	});

	const removeStudent = async () => {
		if (!saved) {
			alert("Please login to continue");

			window.location = "https://kt-studentportal.netlify.app/";
			return;
		}
		const query = {
			username: saved,
			roll: student.roll,
		};

		try {
			await axios.post(
				"https://student---portal.herokuapp.com/teacher/removeStudent",
				query
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes) {
			alert(finalRes);
		} else {
			alert(`Successfully removed Roll No: ${student.roll}`);
			window.location.reload(false);
		}
	};
	return (
		<>
			<h2>Remove Student</h2>
			<form className={classes.root} noValidate autoComplete="off">
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

				<Button
					variant="contained"
					onClick={removeStudent}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Remove
				</Button>
			</form>
		</>
	);
}
