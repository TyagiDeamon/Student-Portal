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
		username: "",
		password: "",
		subject: "",
		students: [
			{
				name: "",
				marks: {
					term1: null,
					term2: null,
					term3: null,
					term4: null,
					total: null,
				},
			},
		],
	});

	let stored = localStorage.getItem(window.location);
	let saved = JSON.parse(stored);

	useEffect(() => {
		axios
			.get(`https://student---portal.herokuapp.com/teacher/${saved}`)
			.then((response) => setTeacher(response.data));
	}, []);

	const classes = useStyles();

	if (!saved) {
		return <div>Access Denied. Please login to continue.</div>;
	}

	return (
		<>
			<h2>All Students</h2>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="Students table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Name</TableCell>
							<TableCell align="center">Roll No.</TableCell>
							<TableCell align="center">Term-1</TableCell>
							<TableCell align="center">Term-2</TableCell>
							<TableCell align="center">Term-3</TableCell>
							<TableCell align="center">Term-4</TableCell>
							<TableCell align="center">Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{teacher.students.map((student, key) => (
							<TableRow key={key}>
								<TableCell
									component="th"
									scope="row"
									align="center"
								>
									{student.name}
								</TableCell>
								<TableCell align="center">
									{student.roll}
								</TableCell>
								<TableCell align="center">
									{student.marks.term1}
								</TableCell>
								<TableCell align="center">
									{student.marks.term2}
								</TableCell>
								<TableCell align="center">
									{student.marks.term3}
								</TableCell>
								<TableCell align="center">
									{student.marks.term4}
								</TableCell>
								<TableCell align="center">
									{student.marks.total}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
