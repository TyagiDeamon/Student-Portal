import Validator from "validator";
import isEmpty from "is-empty";

function validateEmail(email) {
	var re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}
export default function validateRegisterData(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.email = !isEmpty(data.email) ? data.email : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";
	// data.roll = !isEmpty(data.roll) ? data.roll : null;

	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required";
	}

	if (Validator.isEmpty(data.email)) {
		errors.email = "Email field is required";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required";
	}

	// if (Validator.isEmpty(data.roll)) {
	// 	errors.roll = "Roll No field is required";
	// }

	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
	}

	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
	}
	if (!validateEmail(data.email)) {
		errors.email = "Email should be valid";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
