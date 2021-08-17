import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomBackdrop from "../../components/CustomBackdrop/CustomBackdrop";

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

export default function TeacherSignup() {
	const classes = useStyles();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [passwordVisible2, setPasswordVisible2] = useState(false);

	const [teacher, setTeacher] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		subject: "",
	});

	const [successAlert, setSuccessAlert] = useState(false);
	const [errorAlert, setErrorAlert] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const [openBackdrop, setOpenBackdrop] = useState(false);

	let finalRes = {};

	const createTeacher = async () => {
		if (
			!teacher.name ||
			!teacher.email ||
			!teacher.subject ||
			!teacher.password ||
			!teacher.password2
		) {
			return;
		}
		setOpenBackdrop(true);
		try {
			await axios.post(
				"https://student---portal.herokuapp.com/authTeacher/register",
				teacher
			);
		} catch (error) {
			finalRes = error.response.data;
		}
		setOpenBackdrop(false);
		if (finalRes.name) {
			setErrorMessage(finalRes.name);
			setErrorAlert(true);
		} else if (finalRes.email) {
			setErrorMessage(finalRes.email);
			setErrorAlert(true);
		} else if (finalRes.password) {
			setErrorMessage(finalRes.password);
			setErrorAlert(true);
		} else if (finalRes.password2) {
			setErrorMessage(finalRes.password2);
			setErrorAlert(true);
		} else if (finalRes.subject) {
			setErrorMessage(finalRes.subject);
			setErrorAlert(true);
		} else {
			setTeacher({
				name: "",
				email: "",
				subject: "",
				password: "",
				password2: "",
			});
			setSuccessMessage("Successful! Please login to continue");
			setSuccessAlert(true);
		}
	};
	return (
		<>
			<CustomBackdrop open={openBackdrop} />
			<h2>Teacher Signup</h2>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						createTeacher();
					}
				}}
			>
				<TextField
					label="Name"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={teacher.name}
					onChange={(event) => {
						setTeacher({
							...teacher,
							name: event.target.value,
						});
					}}
				/>
				<TextField
					label="Email"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={teacher.email}
					onChange={(event) => {
						setTeacher({
							...teacher,
							email: event.target.value,
						});
					}}
				/>
				<TextField
					label="Subject"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={teacher.subject}
					onChange={(event) => {
						setTeacher({
							...teacher,
							subject: event.target.value,
						});
					}}
				/>

				<FormControl
					variant="outlined"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
				>
					<InputLabel>Create Password</InputLabel>
					<OutlinedInput
						variant="outlined"
						type={passwordVisible ? "text" : "password"}
						value={teacher.password}
						onChange={(event) => {
							setTeacher({
								...teacher,
								password: event.target.value,
							});
						}}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setPasswordVisible(!passwordVisible)}
									edge="end"
								>
									{passwordVisible ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
						labelWidth={135}
					/>
				</FormControl>

				<FormControl
					variant="outlined"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
				>
					<InputLabel>Confirm Password</InputLabel>
					<OutlinedInput
						variant="outlined"
						type={passwordVisible2 ? "text" : "password"}
						value={teacher.password2}
						onChange={(event) => {
							setTeacher({
								...teacher,
								password2: event.target.value,
							});
						}}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setPasswordVisible2(!passwordVisible2)}
									edge="end"
								>
									{passwordVisible2 ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
						labelWidth={135}
					/>
				</FormControl>

				<Button
					variant="contained"
					onClick={createTeacher}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Sign Up
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
