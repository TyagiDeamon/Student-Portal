import Validator from "validator";
import isEmpty from "is-empty";

export default function validateLoginData(data) {
	let errors = {};

	data.name = !isEmpty(data.name) ? data.name : "";
	data.roll = !isEmpty(data.roll) ? data.roll : "";
	data.password = !isEmpty(data.password) ? data.password : "";

	if (Validator.isEmpty(data.name)) {
		errors.name = "Name field is required";
	}

	if (Validator.isEmpty(data.roll)) {
		errors.roll = "Roll No field is required";
	}

	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
}
