import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import useStyles from "../../../style";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import CustomBackdrop from "../../../components/CustomBackdrop/CustomBackdrop";

export default function DeleteClass() {
	let storedEmail = localStorage.getItem("teacher");
	let savedEmail = JSON.parse(storedEmail);

	const classes = useStyles();

	const [query, setQuery] = useState({
		teacherEmail: savedEmail,
		classname: "",
	});

	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [openBackdrop, setOpenBackdrop] = useState(false);

	var finalRes = "";

	const deleteClass = async () => {
		if (!query.classname) {
			return;
		}
		if (!savedEmail) {
			alert("Please login to continue");
			return;
		}

		setOpenBackdrop(true);

		try {
			await axios.post(
				"https://student---portal.herokuapp.com/teacher/deleteClass",
				query
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		setOpenBackdrop(false);

		if (finalRes === "") {
			setSuccessMessage(`Successfully deleted Class: ${query.classname}`);
			setSuccessAlert(true);
			setQuery({
				teacherEmail: savedEmail,
				classname: "",
			});
		} else {
			setErrorMessage(finalRes);
			setErrorAlert(true);
		}
	};
	return (
		<>
			<CustomBackdrop open={openBackdrop} />
			<h4>Delete Class</h4>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						deleteClass();
					}
				}}
			>
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
