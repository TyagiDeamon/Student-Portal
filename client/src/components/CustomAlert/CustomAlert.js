import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomAlert = (props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Snackbar open={props.open} autoHideDuration={3000} onClose={props.onClose} >
				<Alert onClose={props.onClose} severity={props.severity}>
					{props.text}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default CustomAlert;
