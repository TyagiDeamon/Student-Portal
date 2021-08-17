import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
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

export default function TeacherLogin() {
	const classes = useStyles();

	const [teacher, setTeacher] = useState({
		email: "",
		password: "",
	});

	const [passwordVisible, setPasswordVisible] = useState(false);

	const [errorAlert, setErrorAlert] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const [openBackdrop, setOpenBackdrop] = useState(false);

	let finalRes = {};
	let successRes = {};
	const loginTeacher = async () => {
		if (!teacher.email || !teacher.password) {
			return;
		}

		setOpenBackdrop(true);

		try {
			successRes = await axios.post(
				"https://student---portal.herokuapp.com/authTeacher/login",
				teacher
			);
		} catch (error) {
			finalRes = error.response.data;
		}

		setOpenBackdrop(false);

		if (finalRes.email) {
			setErrorMessage(finalRes.email);
			setErrorAlert(true);
		} else if (finalRes.password) {
			setErrorMessage(finalRes.password);
			setErrorAlert(true);
		} else {
			localStorage.setItem("teacher", JSON.stringify(teacher.email));
			localStorage.setItem("teacherName", successRes.data.name);

			window.location.reload();
		}
	};

	return (
		<>
			<CustomBackdrop open={openBackdrop} />
			<h2>Teacher Login</h2>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						loginTeacher();
					}
				}}
			>
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
						labelWidth={70}
					/>
				</FormControl>

				<Button
					variant="contained"
					onClick={loginTeacher}
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
