import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import useStyles from "../../style";

const CustomModal = (props) => {
	const classes = useStyles();
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			className={classes.modal}
			open={props.modal}
			onClose={props.onClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={props.modal}>
				<div
					className={classes.paper}
					style={{ display: "grid" }}
					justifycontent="space-evenly"
					alignitems="stretch"
				>
					<div id="transition-modal-description">{props.desc}</div>
					{props.button1 && (
						<Button
							variant="contained"
							className={classes.openButton}
							stye={{ margin: "auto" }}
							onClick={props.onClickbutton1}
						>
							{props.button1}
						</Button>
					)}
					{props.button2 && (
						<Button
							variant="contained"
							className={classes.closeButton}
							onClick={props.onClickbutton2}
						>
							{props.button2}
						</Button>
					)}
				</div>
			</Fade>
		</Modal>
	);
};

export default CustomModal;
