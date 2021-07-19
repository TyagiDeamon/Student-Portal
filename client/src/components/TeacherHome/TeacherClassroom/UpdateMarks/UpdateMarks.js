import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

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
	formControl: {
		margin: theme.spacing(1),
		// minWidth: 120,
	},
}));

export default function UpdateMarks() {
	let storedEmail = localStorage.getItem("teacher");
	let savedEmail = JSON.parse(storedEmail);

	let storedClass = localStorage.getItem("class");
	let savedClass = JSON.parse(storedClass);

	const classes = useStyles();

	const [query, setQuery] = useState({
		teacherEmail: savedEmail,
		classname: savedClass,
		roll: "",
		term: "",
		marks: "",
	});

	const handleChange = (event) => {
		setQuery({
			...query,
			term: event.target.value,
		});
	};

	const updateMarks = async () => {
		if (!savedClass || !savedEmail) {
			alert("Please login to continue");
			return;
		}

		let finalRes = "";

		try {
			await axios.put(
				"https://student---portal.herokuapp.com/teacher/updateMarks",
				query
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes) {
			alert(finalRes);
		} else {
			alert("Successful");
			window.location.reload(false);
		}
	};
	return (
		<>
			<h4>Update Marks</h4>
			<form className={classes.root} noValidate autoComplete="off">
				<TextField
					id="filled-full-width"
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
				<TextField
					label="Marks"
					type="number"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={query.marks}
					onChange={(event) => {
						setQuery({
							...query,
							marks: event.target.value,
						});
					}}
				/>
				<FormControl
					variant="outlined"
					className={classes.formControl}
					style={{ margin: "10px 20px" }}
					fullWidth
				>
					<InputLabel>Term</InputLabel>
					<Select
						native
						value={query.term}
						onChange={handleChange}
						label="Term"
					>
						<option aria-label="None" value="" />
						<option value={"term1"}>Term-1</option>
						<option value={"term2"}>Term-2</option>
						<option value={"term3"}>Term-3</option>
						<option value={"term4"}>Term-4</option>
					</Select>
				</FormControl>
				<Button
					variant="contained"
					onClick={updateMarks}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Update
				</Button>
			</form>
		</>
	);
}
