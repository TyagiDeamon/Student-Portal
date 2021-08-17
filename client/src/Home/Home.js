import { Container, AppBar, Grid } from "@material-ui/core";
import useStyles from "../style.js";
import React, { useState } from "react";
import CustomNavbar from "../components/Navbar/Navbar";
import CustomModal from "../components/CustomModal/CustomModal";
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage";
import TeacherSignup from "./TeacherSignup/TeacherSignup.js";
import TeacherLogin from "./TeacherLogin/TeacherLogin";
import StudentLogin from "./StudentLogin/StudentLogin";
import StudentSignup from "./StudentSignup/StudentSignup";
import Button from "@material-ui/core/Button";

const navbar = {
	title: "STUDENT PORTAL",
};

export default function Home() {
	const classes = useStyles();
	const [loginState, setLoginState] = useState(true);
	const [signupState, setSignupState] = useState(false);

	const [modalWelcome, setmodalWelcome] = useState(true);

	const visited = localStorage.getItem("visited");

	return (
		<>
			<CustomNavbar {...navbar} />
			<Container>
				<Grid container justifyContent="center">
					<Button
						variant="contained"
						onClick={() => {
							setLoginState(true);
							setSignupState(false);
						}}
						disableElevation={true}
						style={{
							backgroundColor: "inherit",
							color: "#000000",
							margin: "20px 25px",
							padding: "0px",
						}}
					>
						<h2 style={{ margin: "0px" }}>Login</h2>
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							setLoginState(false);
							setSignupState(true);
						}}
						disableElevation={true}
						style={{
							backgroundColor: "inherit",
							color: "#000000",
							margin: "20px 25px",
							padding: "0px",
						}}
					>
						<h2 style={{ margin: "0px" }}>Signup</h2>
					</Button>
				</Grid>

				<Grid container justifyContent="space-evenly" alignItems="stretch">
					{loginState && (
						<>
							<Grid item xs={12} md={3}>
								<AppBar
									className={classes.appBar}
									position="static"
									color="inherit"
								>
									<StudentLogin />
								</AppBar>
							</Grid>
							<Grid item xs={12} md={3}>
								<AppBar
									className={classes.appBar}
									position="static"
									color="inherit"
								>
									<TeacherLogin />
								</AppBar>
							</Grid>
						</>
					)}
					{signupState && (
						<>
							<Grid item xs={12} md={3}>
								<AppBar
									className={classes.appBar}
									position="static"
									color="inherit"
								>
									<StudentSignup />
								</AppBar>
							</Grid>
							<Grid item xs={12} md={3}>
								<AppBar
									className={classes.appBar}
									position="static"
									color="inherit"
								>
									<TeacherSignup />
								</AppBar>
							</Grid>
						</>
					)}
				</Grid>
			</Container>
			{!visited && (
				<CustomModal
					modal={modalWelcome}
					desc={<WelcomeMessage />}
					onClose={() => {
						setmodalWelcome(false);
					}}
					width="80%"
					button1="Don't show again"
					onClickbutton1={() => {
						setmodalWelcome(false);
						localStorage.setItem("visited", true);
					}}
					button2="Close"
					onClickbutton2={() => {
						setmodalWelcome(false);
					}}
				/>
			)}
		</>
	);
}
