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

export default function StudentLogin() {
	const classes = useStyles();
	const [student, setStudent] = useState({
		email: "",
		password: "",
	});
	const [passwordVisible, setPasswordVisible] = useState(false);

	const [errorAlert, setErrorAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	let finalRes = {};
	let successRes = {};
	const loginStudent = async () => {
		if (!student.email || !student.password) {
			return;
		}
		try {
			successRes = await axios.post(
				"https://student---portal.herokuapp.com/authStudent/login",
				student
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		if (finalRes.email) {
			setErrorMessage(finalRes.email);
			setErrorAlert(true);
		} else if (finalRes.password) {
			setErrorMessage(finalRes.password);
			setErrorAlert(true);
		} else {
			localStorage.setItem("student", student.email);
			localStorage.setItem("studentName", successRes.data.name);

			window.location.reload(false);
		}
	};
	return (
		<>
			<h2>Student Login</h2>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						event.preventDefault();
						loginStudent();
					}
				}}
			>
				<TextField
					label="Email"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
					variant="outlined"
					value={student.email}
					onChange={(event) => {
						setStudent({
							...student,
							email: event.target.value,
						});
					}}
				/>

				<FormControl
					variant="outlined"
					style={{ margin: "10px 20px" }}
					fullWidth
					margin="normal"
				>
					<InputLabel>Password</InputLabel>
					<OutlinedInput
						variant="outlined"
						type={passwordVisible ? "text" : "password"}
						value={student.password}
						onChange={(event) => {
							setStudent({
								...student,
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
						labelWidth={70}
					/>
				</FormControl>

				<Button
					variant="contained"
					onClick={loginStudent}
					style={{
						backgroundColor: "steelblue",
						color: "white",
						margin: "0 auto",
						width: "80%",
					}}
				>
					Login
				</Button>
			</form>

			<CustomAlert
				open={errorAlert}
				onClose={() => setErrorAlert(false)}
				severity="error"
				text={errorMessage}
			/>
		</>
	);
}
