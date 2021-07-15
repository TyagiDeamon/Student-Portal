import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
	let stored = localStorage.getItem(window.location);
	let saved = JSON.parse(stored);

	const classes = useStyles();

	const [student, setStudent] = useState({
		roll: "",
		marks: "",
		term: "",
	});

	const handleChange = (event) => {
		setStudent({
			...student,
			term: event.target.value,
		});
	};

	let finalRes = null;

	const updateMarks = async () => {
		if (!saved) {
			alert("Please login to continue");

			window.location = "https://kt-studentportal.netlify.app/";
			return;
		}
		const query = {
			username: saved,
			roll: student.roll,
			marks: student.marks,
			term: student.term,
		};

		try {
			await axios.put(
				"https://student---portal.herokuapp.com/student/updateMarks",
				query
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes) {
			alert(finalRes);
		} else {
			alert(`Updated marks of student Roll No: ${student.roll}`);

			window.location.reload(false);
		}
	};
	return (
		<>
			<h2>Update Marks</h2>
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
				<TextField
					label="Marks"
					type="number"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="filled"
					value={student.marks}
					onChange={(event) => {
						setStudent({
							...student,
							marks: event.target.value,
						});
					}}
				/>
				<FormControl
					style={{ margin: "10px 20px" }}
					fullWidth
					variant="filled"
					className={classes.formControl}
				>
					<InputLabel id="demo-simple-select-filled-label">
						Select term
					</InputLabel>
					<Select value={student.term} onChange={handleChange}>
						<MenuItem value={"term1"}>Term-1</MenuItem>
						<MenuItem value={"term2"}>Term-2</MenuItem>
						<MenuItem value={"term3"}>Term-3</MenuItem>
						<MenuItem value={"term4"}>Term-4</MenuItem>
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
