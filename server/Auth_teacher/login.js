import Validator from "validator";
import isEmpty from "is-empty";

export default function validateLoginData(data) {
	let errors = {};

	data.username = !isEmpty(data.username) ? data.username : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.username)) {
		errors.username = "Username field is required";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
