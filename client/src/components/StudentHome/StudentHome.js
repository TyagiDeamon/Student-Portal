import React from "react";
import { Container, AppBar, Grid } from "@material-ui/core";
import CustomNavbar from "../Navbar/Navbar.js";
import useStyles from "../../style";
import MarksTable from "./MarksTable/MarksTable";
import Button from "@material-ui/core/Button";

const navbar = {
	title: "Welcome Student",
};

const StudentHome = () => {
	const logOut = () => {
		localStorage.removeItem(window.location);

		window.location = "https://kt-studentportal.netlify.app/";
	};

	const classes = useStyles();

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
							<MarksTable />
						</AppBar>
					</Grid>

					<Grid item xs={12} md={4}>
						<Button
							size="large"
							variant="contained"
							style={{
								backgroundColor: "steelblue",
								color: "white",
								margin: "0 auto",
								width: "80%",
							}}
							className={classes.margin}
							onClick={logOut}
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
