import React from "react";
import { AppBar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: "20px",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const CustomNavbar = (props) => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar style={{ backgroundColor: "#008080" }} position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						{props.title}
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default CustomNavbar;
