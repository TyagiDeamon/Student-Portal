import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(
	(theme) => ({
		appBar: {
			borderRadius: 15,
			margin: "30px 0",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			paddingBottom: "20px",
		},
		openButton: {
			backgroundColor: "#d21d1d",
			color: "white",
			margin: "10px auto",
			width: "80%",
			"&:hover": {
				background: "#d21d1d",
			},
		},
		closeButton: {
			backgroundColor: "steelblue",
			color: "white",
			margin: "10px auto",
			width: "80%",
			"&:hover": {
				background: "steelblue",
			},
		},
		modal: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			border: "2px solid gray",
			borderRadius: "5px",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
		root: {
			display: "flex",
			flexWrap: "wrap",
		},
		textField: {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: "25ch",
		},
	}),
	{ index: 1 }
);
