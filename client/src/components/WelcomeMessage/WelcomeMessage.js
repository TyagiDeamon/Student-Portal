import React from "react";

const WelcomeMessage = () => {
	return (
		<>
			<div>
				<h2>Welcome</h2>
				<p>
					This portal is designed to help students and teachers interact
					effectively.
					<br />
					If you are new to this portal, please register yourself.
					<br />
					After successful registration, teacher can create classes for
					students, and in each class, the teacher can add student using the
					email id of student, update marks of the students, and can remove the
					students from the class as well.
					<br />
					Students will be able to see their marks in each subject after login.
				</p>
			</div>
			<div>
				<h4>Upcoming features</h4>
				<p>These are some of the features that I'm currently working on.</p>
				<ul>
					<li>Email verification.</li>
					<li>Password reset.</li>
					<li>
						Space for teachers to upload resources like pdfs and documents for
						the students.
					</li>
					<li>Notice section for displaying important information.</li>
					<li>
						Chat availability so that students and teachers can contact easily.
					</li>
				</ul>
			</div>
			<p>
				Code for this project can be found{" "}
				<a href="https://github.com/TyagiDeamon/Student-Portal">here</a>. Thank
				you for visiting!
			</p>
		</>
	);
};

export default WelcomeMessage;
