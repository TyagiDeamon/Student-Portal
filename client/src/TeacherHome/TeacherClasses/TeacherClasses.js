import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import CustomNavbar from "../../components/Navbar/Navbar.js";
import useStyles from "../../style";
import Button from "@material-ui/core/Button";
import CustomModal from "../../components/CustomModal/CustomModal";
import DeleteClass from "./DeleteClass/DeleteClass";
import CreateClass from "./CreateClass/CreateClass";
import ClassesTable from "./ClassesTable/ClassesTable";

export default function ShowStudent() {
	const classes = useStyles();

	let stored = localStorage.getItem("teacher");
	let saved = JSON.parse(stored);

	const [logoutModal, setLogoutModal] = useState(false);
	const [deleteClassModal, setdeleteClassModal] = useState(false);
	const [createClassModal, setcreateClassModal] = useState(false);

	if (!saved) {
		return <div>Access Denied. Please login to continue.</div>;
	}

	const logOut = () => {
		localStorage.removeItem("teacher");
		localStorage.removeItem("teacherName");
		localStorage.removeItem("class");

		window.location = "https://kt-studentportal.netlify.app/";
	};

	return (
		<Container>
			<CustomNavbar
				{...{ title: `Welcome ${localStorage.getItem("teacherName")}` }}
			/>
			<Grid container justifyContent="space-between" alignItems="stretch">
				<Grid item xs={12} md={7}>
					<ClassesTable />
				</Grid>
				<Grid item xs={12} md={4}>
					<CustomModal
						modal={logoutModal}
						onClickbutton2={() => setLogoutModal(false)}
						desc={<h4>Are you sure?</h4>}
						onClickbutton1={logOut}
						button1="Yes"
						button2="No"
						onClose={() => setLogoutModal(false)}
					/>
					<Button
						size="large"
						variant="contained"
						className={classes.openButton}
						onClick={() => setLogoutModal(true)}
						style={{ marginTop: "30px" }}
					>
						Logout
					</Button>

					<CustomModal
						modal={createClassModal}
						onClickbutton1={() => {
							setcreateClassModal(false);
							window.location.reload();
						}}
						desc={<CreateClass />}
						button1="Cancel"
						onClose={() => {
							setcreateClassModal(false);
							window.location.reload();
						}}
					/>
					<Button
						size="large"
						variant="contained"
						className={classes.closeButton}
						onClick={() => setcreateClassModal(true)}
					>
						Create Class
					</Button>

					<CustomModal
						modal={deleteClassModal}
						onClickbutton2={() => {
							setdeleteClassModal(false);
							window.location.reload();
						}}
						desc={<DeleteClass />}
						button2="Cancel"
						onClose={() => {
							setdeleteClassModal(false);
							window.location.reload();
						}}
					/>
					<Button
						size="large"
						variant="contained"
						className={classes.closeButton}
						onClick={() => setdeleteClassModal(true)}
					>
						Delete Class
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
}
