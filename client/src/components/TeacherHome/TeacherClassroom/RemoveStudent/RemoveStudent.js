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

export default function RemoveStudent() {
	let storedEmail = localStorage.getItem("teacher");
	let savedEmail = JSON.parse(storedEmail);

	let storedClass = localStorage.getItem("class");
	let savedClass = JSON.parse(storedClass);

	const classes = useStyles();

	const [query, setQuery] = useState({
		roll: "",
		teacherEmail: savedEmail,
		classname: savedClass,
	});

	var finalRes = "";

	const removeStudent = async () => {
		if (!savedClass || !savedEmail) {
			alert("Please login to continue");
			return;
		}

		try {
			await axios.post(
				"https://student---portal.herokuapp.com/teacher/removeStudent",
				query
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes === "") {
			alert(`Successfully removed Roll No: ${query.roll}`);
			window.location.reload(false);
		} else {
			alert(finalRes);
		}
	};
	return (
		<>
			<h4>Remove Student</h4>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="outlined-basic"
					label="Roll No"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={query.roll}
					onChange={(event) => {
						setQuery({
							...query,
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
