import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const useStyles = makeStyles({
	table: {
		minWidth: 650,
	},
});

export default function ShowStudent() {
	const [teacher, setTeacher] = useState({
		email: "",
		password: "",
		subject: "",
		classes: [],
	});

	let stored = localStorage.getItem("teacher");
	let saved = JSON.parse(stored);
	const savedClass = JSON.parse(localStorage.getItem("class"));

	useEffect(() => {
		axios
			.get(`https://student---portal.herokuapp.com/teacher/${saved}`)
			.then((response) => setTeacher(response.data));
	}, []);

	const classes = useStyles();

	if (!saved) {
		return <div>Access Denied. Please login to continue.</div>;
	}

	const arr = teacher.classes;

	return (
		<>
			<h2>All Students</h2>
			<TableContainer
				component={Paper}
				style={{
					maxHeight: "60vh",
					overflow: "scroll",
					scrollbarWidth: "none",
				}}
			>
				<Table
					stickyHeader
					className={classes.table}
					aria-label="Students table"
				>
					<TableHead>
						<TableRow>
							<TableCell align="center">
								<b>Name</b>
							</TableCell>
							<TableCell align="center">
								<b>Roll No.</b>
							</TableCell>
							<TableCell align="center">
								<b>Term-1</b>
							</TableCell>
							<TableCell align="center">
								<b>Term-2</b>
							</TableCell>
							<TableCell align="center">
								<b>Term-3</b>
							</TableCell>
							<TableCell align="center">
								<b>Term-4</b>
							</TableCell>
							<TableCell align="center">
								<b>Total</b>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{arr.map(
							(value) =>
								value.className == savedClass &&
								(value.students.length > 0 ? (
									value.students.map((item, key) => (
										<TableRow key={key}>
											<TableCell component="th" scope="row" align="center">
												{item.name}
											</TableCell>
											<TableCell align="center">{item.roll}</TableCell>
											<TableCell align="center">{item.term1}</TableCell>
											<TableCell align="center">{item.term2}</TableCell>
											<TableCell align="center">{item.term3}</TableCell>
											<TableCell align="center">{item.term4}</TableCell>
											<TableCell align="center">{item.total}</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell>
											You have not added any student in this class.
										</TableCell>
									</TableRow>
								))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
