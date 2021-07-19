import React, { useState, useEffect } from "react";
import useStyles from "../../../../style";
import { AppBar } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const ClassesTable = () => {
	const classes = useStyles();
	const [teacher, setTeacher] = useState({
		email: "",
		name: "",
		password: "",
		subject: "",
		classes: [],
	});

	let stored = localStorage.getItem("teacher");
	let saved = JSON.parse(stored);

	useEffect(() => {
		async function fetch() {
			const response = await axios.get(
				`https://student---portal.herokuapp.com/teacher/${saved}`
			);

			await setTeacher(response.data);
		}

		fetch();
	}, []);

	if (!saved) {
		return <div>Access Denied. Please login to continue.</div>;
	}

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<h2>Your Classes</h2>
			<TableContainer component={Paper} style={{ maxHeight: "60vh" }}>
				<Table
					stickyHeader
					className={classes.table}
					aria-label="Students table"
				>
					<TableHead>
						<TableRow>
							<TableCell align="center">
								<b>CLASS</b>
							</TableCell>
							<TableCell align="center">
								<b>OPEN</b>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{teacher.classes.length > 0 ? (
							teacher.classes.map((item, key) => (
								<TableRow key={key}>
									<TableCell
										component="th"
										scope="row"
										align="center"
										style={{ width: "50%" }}
									>
										{item.className}
									</TableCell>
									<TableCell align="center">
										<Button
											size="medium"
											variant="contained"
											style={{
												backgroundColor: "steelblue",
												color: "#ffffff",
											}}
											onClick={() => {
												localStorage.setItem("class", item.className);
												window.location = `https://kt-studentportal.netlify.app/class/${item.className}`;
											}}
										>
											Open
										</Button>
									</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell align="center">No classes to show</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</AppBar>
	);
};

export default ClassesTable;
