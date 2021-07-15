import React, { useState } from "react";
import { Container, AppBar, Grid } from "@material-ui/core";
import CustomNavbar from "../Navbar/Navbar.js";
import useStyles from "../../style";
import StudentSignup from "./StudentSignup/StudentSignup";
import ShowStudent from "./ShowStudent/ShowStudent";
import AddStudent from "./AddStudent/AddStudent";
import UpdateMarks from "./UpdateMarks/UpdateMarks";
import RemoveStudent from "./RemoveStudent/RemoveStudent";
import Button from "@material-ui/core/Button";
import Footer from "../Footer/Footer";

const navbar = {
	title: "Welcome Teacher",
	variant: "h3",
};

const TeacherHome = () => {
	const classes = useStyles();

	const [showUpdateMarks, setShowUpdateMarks] = useState(false);

	const [showAddStudent, setShowAddStudent] = useState(false);

	const [showRemoveStudent, setShowRemoveStudent] = useState(false);

	const [showCreateStudent, setShowCreateStudent] = useState(false);

	const show = (item, setItem) => {
		setItem(!item);
	};

	const logOut = () => {
		localStorage.removeItem(window.location);

		window.location = "https://kt-studentportal.netlify.app/";
	};

	return (
		<>
			<CustomNavbar {...navbar} />
			<Container>
				<Grid container justify="space-between" alignItems="stretch">
					<Grid item xs={12} md={7}>
						<AppBar
							className={classes.appBar}
							position="static"
							color="inherit"
						>
							<ShowStudent />
						</AppBar>
					</Grid>
					<Grid item xs={12} md={4}>
						<Button
							size="large"
							variant="contained"
							style={{
								backgroundColor: "steelblue",
								color: "white",
								margin: "10px auto",
								width: "80%",
							}}
							className={classes.margin}
							onClick={logOut}
						>
							Logout
						</Button>

						<Button
							size="large"
							variant="contained"
							style={{
								backgroundColor: "steelblue",
								color: "white",
								margin: "10px auto",
								width: "80%",
							}}
							className={classes.margin}
							onClick={() => {
								show(showUpdateMarks, setShowUpdateMarks);
							}}
						>
							Update Marks
						</Button>
						{showUpdateMarks && (
							<AppBar
								className={classes.appBar}
								position="static"
								color="inherit"
							>
								<UpdateMarks />
							</AppBar>
						)}

						<Button
							size="large"
							variant="contained"
							style={{
								backgroundColor: "steelblue",
								color: "white",
								margin: "10px auto",
								width: "80%",
							}}
							className={classes.margin}
							onClick={() => {
								show(showAddStudent, setShowAddStudent);
							}}
						>
							Add Student
						</Button>
						{showAddStudent && (
							<AppBar
								className={classes.appBar}
								position="static"
								color="inherit"
							>
								<AddStudent />
							</AppBar>
						)}

						<Button
							size="large"
							variant="contained"
							style={{
								backgroundColor: "steelblue",
								color: "white",
								margin: "10px auto",
								width: "80%",
							}}
							className={classes.margin}
							onClick={() => {
								show(showRemoveStudent, setShowRemoveStudent);
							}}
						>
							Remove Student
						</Button>
						{showRemoveStudent && (
							<AppBar
								className={classes.appBar}
								position="static"
								color="inherit"
							>
								<RemoveStudent />
							</AppBar>
						)}
						<Button
							size="large"
							variant="contained"
							style={{
								backgroundColor: "steelblue",
								color: "white",
								margin: "10px auto",
								width: "80%",
							}}
							className={classes.margin}
							onClick={() => {
								show(showCreateStudent, setShowCreateStudent);
							}}
						>
							Create Student
						</Button>
						{showCreateStudent && (
							<AppBar
								className={classes.appBar}
								position="static"
								color="inherit"
							>
								<StudentSignup />
							</AppBar>
						)}
					</Grid>
				</Grid>
				<Grid>
					<Footer />
				</Grid>
			</Container>
		</>
	);
};

export default TeacherHome;
