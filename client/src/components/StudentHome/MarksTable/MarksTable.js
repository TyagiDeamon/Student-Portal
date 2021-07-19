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

export default function MarksTable() {
	let stored = localStorage.getItem("student");
	// let saved = JSON.parse(stored);
	const [student, setStudent] = useState({
		email: "",
		roll: "",
		password: "",
		name: "",
		scores: [
			{
				subject: "",
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

	useEffect(() => {
		axios
			.get(`https://student---portal.herokuapp.com/student/${stored}`)
			.then((response) => setStudent(response.data));
	}, []);

	const classes = useStyles();

	if (!stored) {
		return <div>Access Denied</div>;
	}

	return (
		<>
			<h2>Marks</h2>
			<TableContainer style={{ maxHeight: "60vh" }} component={Paper}>
				<Table stickyHeader className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">
								<b>Subject</b>
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
						{student.scores.length > 0 ? (
							student.scores.map((item, key) => (
								<TableRow key={key}>
									<TableCell component="th" scope="row" align="center">
										{item.subject}
									</TableCell>
									<TableCell align="center">{item.marks.term1}</TableCell>
									<TableCell align="center">{item.marks.term2}</TableCell>
									<TableCell align="center">{item.marks.term3}</TableCell>
									<TableCell align="center">{item.marks.term4}</TableCell>
									<TableCell align="center">{item.marks.total}</TableCell>
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell>No subject to show</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
