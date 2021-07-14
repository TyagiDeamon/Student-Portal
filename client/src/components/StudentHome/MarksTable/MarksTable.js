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
	const [student, setStudent] = useState({
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

	let stored = localStorage.getItem(window.location);
	let saved = JSON.parse(stored);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/student/${saved}`)
			.then((response) => setStudent(response.data));
		// empty dependency array means this effect will only run once (like componentDidMount in classes)
	}, []);

	const classes = useStyles();

	if (!saved) {
		return <div>Access Denied</div>;
	}

	return (
		<>
			<h2>Marks</h2>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="center">Subject</TableCell>
							<TableCell align="center">Term-1</TableCell>
							<TableCell align="center">Term-2</TableCell>
							<TableCell align="center">Term-3</TableCell>
							<TableCell align="center">Term-4</TableCell>
							<TableCell align="center">Total</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{student.scores.map((item, key) => (
							<TableRow key={key}>
								<TableCell
									component="th"
									scope="row"
									align="center"
								>
									{item.subject}
								</TableCell>
								<TableCell align="center">
									{item.marks.term1}
								</TableCell>
								<TableCell align="center">
									{item.marks.term2}
								</TableCell>
								<TableCell align="center">
									{item.marks.term3}
								</TableCell>
								<TableCell align="center">
									{item.marks.term4}
								</TableCell>
								<TableCell align="center">
									{item.marks.total}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
