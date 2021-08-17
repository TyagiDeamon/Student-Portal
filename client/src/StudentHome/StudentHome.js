import React, { useState } from "react";
import { Container, AppBar, Grid } from "@material-ui/core";
import CustomNavbar from "../components/Navbar/Navbar.js";
import useStyles from "../style";
import MarksTable from "./MarksTable/MarksTable";
import Button from "@material-ui/core/Button";
import CustomModal from "../components/CustomModal/CustomModal";

const navbar = {
	title: `Welcome ${localStorage.getItem("studentName")}`,
};

const StudentHome = () => {
	const [logoutModal, setLogoutModal] = useState(false);

	const handleLogout = () => {
		setLogoutModal(true);
	};

	const handleCloseLogout = () => {
		setLogoutModal(false);
	};
	const logOut = () => {
		localStorage.removeItem("student");
		localStorage.removeItem("studentName");

		window.location.reload();
	};

	const classes = useStyles();

	return (
		<>
			<CustomNavbar {...navbar} />
			<Container>
				<Grid container justifyContent="space-between" alignItems="stretch">
					<Grid item xs={12} md={7}>
						<AppBar
							className={classes.appBar}
							position="static"
							color="inherit"
						>
							<MarksTable />
						</AppBar>
					</Grid>

					<Grid item xs={12} md={4}>
						<CustomModal
							modal={logoutModal}
							onClose={handleCloseLogout}
							desc={<h4>Are you sure?</h4>}
							onClickbutton1={logOut}
							onClickbutton2={handleCloseLogout}
							button1="Yes"
							button2="No"
						/>
						<Button
							style={{ margin: "30px 0" }}
							size="large"
							variant="contained"
							className={classes.openButton}
							onClick={handleLogout}
						>
							Logout
						</Button>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default StudentHome;
