import { Container, AppBar, Grid } from "@material-ui/core";
import useStyles from "../../style.js";
import React from "react";

import CustomNavbar from "../Navbar/Navbar";
import TeacherSignup from "./TeacherSignup/TeacherSignup.js";
import TeacherLogin from "./TeacherLogin/TeacherLogin";
import StudentLogin from "./StudentLogin/StudentLogin";
import Footer from "../Footer/Footer";

const navbar = {
	title: "STUDENT PORTAL",
};

export default function Home() {
	const classes = useStyles();

	return (
		<>
			<CustomNavbar {...navbar} />
			<Container>
				<Grid container justify="space-between" alignItems="stretch">
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
					<Grid item xs={12} md={3}>
						<AppBar
							className={classes.appBar}
							position="static"
							color="inherit"
						>
							<TeacherSignup />
						</AppBar>
					</Grid>
				</Grid>

				<Grid><Footer /></Grid>
			</Container>
		</>
	);
}
