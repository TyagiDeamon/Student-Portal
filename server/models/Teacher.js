import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	students: [
		{
			name: String,
			roll: String,
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

// module.exports = student = mongoose.model("student", teacherSchema);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
