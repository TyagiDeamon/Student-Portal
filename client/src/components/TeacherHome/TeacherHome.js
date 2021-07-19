import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TeacherClasses from "./TeacherClasses/TeacherClasses";
import TeacherClassroom from "./TeacherClassroom/TeacherClassroom";

const TeacherHome = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={TeacherClasses} />
				<Route path="/class" component={TeacherClassroom} />
			</Switch>
		</BrowserRouter>
	);
};

export default TeacherHome;
