import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import useStyles from "../../../style";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import CustomBackdrop from "../../../components/CustomBackdrop/CustomBackdrop";

export default function CreateClass() {
	let storedEmail = localStorage.getItem("teacher");
	let savedEmail = JSON.parse(storedEmail);

	const classes = useStyles();

	const [newClass, setNewClass] = useState({
		teacherEmail: savedEmail,
		classname: "",
	});

	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [openBackdrop, setOpenBackdrop] = useState(false);

	let finalRes = null;

	const createClass = async () => {
		if (!newClass.classname) {
			return;
		}
		if (!savedEmail) {
			alert("Please login to continue");
			return;
		}

		setOpenBackdrop(true);

		try {
			await axios.post(
				"https://student---portal.herokuapp.com/teacher/createClass",
				newClass
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		setOpenBackdrop(false);

		if (finalRes) {
			setErrorMessage(finalRes);
			setErrorAlert(true);
		} else {
			setSuccessMessage(`Successfully created class ${newClass.classname}`);
			setSuccessAlert(true);
			setNewClass({
				teacherEmail: savedEmail,
				classname: "",
			});
		}
	};

	return (
		<>
			<CustomBackdrop open={openBackdrop} />
			<h4>Create class</h4>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						createClass();
					}
				}}
			>
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
