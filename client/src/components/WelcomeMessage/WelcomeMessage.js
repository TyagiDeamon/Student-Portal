import React from "react";

const WelcomeMessage = () => {
	return (
		<>
			<div>
				<h2>Welcome</h2>
				<p>
					This portal is designed to help students and teachers interact
					effectively. If you are new to this portal, please register yourself.
					<br />
					After successful registration, a teacher can create classes for
					students. In each class, the teacher can add students using the email
					id of a student, update the marks of the students, and remove the
					students as well.
					<br />
					Students will be able to see their marks in each subject after login.
				</p>
				<strong>Sample accounts for experiencing the portal</strong>
				<p>
					t1@t.com, t2@t.com, and t3@t.com are the teacher accounts, and
					s1@s.com, s2@s.com, and s3@s.com are the student accounts. The
					password for each is 123456. You can use these to play around and
					experience the portal.
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
						Chat availability so that students and teachers can contact
						smoothly.
					</li>
				</ul>
			</div>
			<p>
				The code for this project can be found{" "}
				<a href="https://github.com/TyagiDeamon/Student-Portal">here</a>. Thank
				you for visiting!
			</p>
		</>
	);
};

export default WelcomeMessage;
