import { Container, AppBar, Grid } from "@material-ui/core";
import useStyles from "../../style.js";
import React, { useState } from "react";
import CustomNavbar from "../Navbar/Navbar";
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
	return (
		<>
			<CustomNavbar {...navbar} />
			<Container>
				<Grid container justify="center">
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

				<Grid container justify="space-evenly" alignItems="stretch">
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
		</>
	);
}
