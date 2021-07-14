import { Container, Grow } from "@material-ui/core";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home.js"
import TeacherHome from "./components/TeacherHome/TeacherHome.js";
import StudentHome from "./components/StudentHome/StudentHome.js";
import useStyles from "./style"

function App() {
	const classes = useStyles();
	return (
		<div className={`${classes.body} App`}>
			<BrowserRouter>
				<Container maxWidth="lg">
					<Grow in>
						<Switch>
							<Route path="/" exact component={Home} />
							<Route path="/teacher" component={TeacherHome} />
							<Route path="/student" component={StudentHome} />
						</Switch>
					</Grow>
				</Container>
			</BrowserRouter>
		</div>
	);
}

export default App;
