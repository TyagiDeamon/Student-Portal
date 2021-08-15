import { Container, Grow } from "@material-ui/core";
import "./App.css";
import Home from "./Home/Home.js";
import TeacherHome from "./TeacherHome/TeacherHome.js";
import StudentHome from "./StudentHome/StudentHome.js";
import useStyles from "./style";
import Footer from "./components/Footer/Footer";

function App() {
	const classes = useStyles();
	let teacher = null;
	teacher = localStorage.getItem("teacher");
	let student = null;
	student = localStorage.getItem("student");

	return (
		<div className={`${classes.body} App`}>
			<Container maxWidth="lg">
				{!teacher && !student && (
					<Grow in>
						<Home />
					</Grow>
				)}
				{student && (
					<Grow in>
						<StudentHome />
					</Grow>
				)}
				{teacher && (
					<Grow in>
						<TeacherHome />
					</Grow>
				)}
			</Container>
			<Footer />
		</div>
	);
}

export default App;
