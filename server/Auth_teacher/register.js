import Validator from "validator";
import isEmpty from "is-empty";

export default function validateRegisterData(data) {
	let errors = {};

	data.username = !isEmpty(data.username) ? data.username : "";
	data.subject = !isEmpty(data.subject) ? data.subject : "";
	data.password = !isEmpty(data.password) ? data.password : "";
	data.password2 = !isEmpty(data.password2) ? data.password2 : "";

	if (Validator.isEmpty(data.username)) {
		errors.username = "Username field is required";
    }
    
	if (Validator.isEmpty(data.subject)) {
		errors.subject = "Subject field is required";
    }
    
	if (Validator.isEmpty(data.password)) {
		errors.password = "Password field is required";
    }
    
	if (Validator.isEmpty(data.password2)) {
		errors.password2 = "Confirm password field is required";
    }
    
	if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
		errors.password = "Password must be at least 6 characters";
    }
    
	if (!Validator.equals(data.password, data.password2)) {
		errors.password2 = "Passwords must match";
    }
    
	return {
		errors,
		isValid: isEmpty(errors),
	};
}
