import React, { useState } from "react";
import { Container, AppBar, Grid } from "@material-ui/core";
import CustomNavbar from "../../components/Navbar/Navbar.js";
import useStyles from "../../style";
import StudentsTable from "./StudentsTable/StudentsTable";
import AddStudent from "./AddStudent/AddStudent";
import UpdateMarks from "./UpdateMarks/UpdateMarks";
import RemoveStudent from "./RemoveStudent/RemoveStudent";
import Button from "@material-ui/core/Button";
import CustomModal from "../../components/CustomModal/CustomModal";
const navbar = {
	title: `Welcome ${localStorage.getItem("teacherName")}`,
};

const TeacherClassroom = () => {
	const classes = useStyles();

	const logOut = () => {
		localStorage.removeItem("teacher");
		localStorage.removeItem("class");
		localStorage.removeItem("teacherName");

		window.location = "https://kt-studentportal.netlify.app/";
	};
	const [modalLogout, setModalLogout] = useState(false);
	const [modalAdd, setModalAdd] = useState(false);
	const [modalRemove, setModalRemove] = useState(false);
	const [modalUpdate, setModalUpdate] = useState(false);

	const formButtons = [
		{
			text: "Update Marks",
			form: <UpdateMarks />,
			modal: modalUpdate,
			setmodal: setModalUpdate,
		},
		{
			text: "Add Student",
			form: <AddStudent />,
			modal: modalAdd,
			setmodal: setModalAdd,
		},
		{
			text: "Remove Student",
			form: <RemoveStudent />,
			modal: modalRemove,
			setmodal: setModalRemove,
		},
	];

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
							<StudentsTable />
						</AppBar>
					</Grid>
					<Grid item xs={12} md={4}>
						<CustomModal
							modal={modalLogout}
							onClickbutton2={() => setModalLogout(false)}
							desc={<h4>Are you sure?</h4>}
							onClose={() => setModalLogout(false)}
							onClickbutton1={logOut}
							button1="Yes"
							button2="No"
						/>
						<Button
							size="large"
							variant="contained"
							className={classes.openButton}
							onClick={() => setModalLogout(true)}
							style={{ marginTop: "30px" }}
						>
							Logout
						</Button>
						{formButtons.map((item, key) => (
							<div key={key}>
								<CustomModal
									modal={item.modal}
									onClickbutton1={() => {
										item.setmodal(false);
										window.location.reload(false);
									}}
									onClose={() => {
										item.setmodal(false);
										window.location.reload(false);
									}}
									desc={item.form}
									button1="Cancel"
								/>
								<Button
									size="large"
									variant="contained"
									className={classes.closeButton}
									onClick={() => item.setmodal(true)}
								>
									{item.text}
								</Button>
							</div>
						))}
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default TeacherClassroom;
