import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import CustomBackdrop from "../../../components/CustomBackdrop/CustomBackdrop";

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

	const [query, setStudent] = useState({
		teacherEmail: savedEmail,
		classname: savedClass,
		email: "",
	});

	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [openBackdrop, setOpenBackdrop] = useState(false);

	const addStudent = async () => {
		if (!query.email) {
			return;
		}
		if (!savedEmail || !savedClass) {
			alert("Please login to continue");
			return;
		}

		setOpenBackdrop(true);

		let finalRes = "";

		try {
			await axios.post(
				"https://student---portal.herokuapp.com/teacher/addStudent",
				query
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		setOpenBackdrop(false);

		if (finalRes === "") {
			setSuccessMessage("Student added successfully");
			setSuccessAlert(true);
			setStudent({
				email: "",
			});
		} else {
			setErrorMessage(finalRes);
			setErrorAlert(true);
		}
	};
	return (
		<>
			<CustomBackdrop open={openBackdrop} />
			<h4>Add Student</h4>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						addStudent();
					}
				}}
			>
				<TextField
					id="filled-full-width"
					label="Enter student's email"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={query.email}
					onChange={(event) => {
						setStudent({
							...query,
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
			<CustomAlert
				open={errorAlert}
				onClose={() => setErrorAlert(false)}
				severity="error"
				text={errorMessage}
			/>
			<CustomAlert
				open={successAlert}
				onClose={() => setSuccessAlert(false)}
				severity="success"
				text={successMessage}
			/>
		</>
	);
}
