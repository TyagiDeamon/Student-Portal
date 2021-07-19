import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},

	scores: [
		{
			subject: String,
			marks: {
				term1: {
					type: Number,
					default: 0,
				},
				term2: {
					type: Number,
					default: 0,
				},
				term3: {
					type: Number,
					default: 0,
				},
				term4: {
					type: Number,
					default: 0,
				},
				total: {
					type: Number,
					default: 0,
				},
			},
		},
	],
});

// module.exports = student = mongoose.model("student", studentSchema);

const Student = mongoose.model("Student", studentSchema);
export default Student;