import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
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
	subject: {
		type: String,
		required: true,
	},
	classes: [
		{
			className: String,
			students: [
				{
					name: String,
					roll: String,
					email: String,
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
			],
		},
	],
});

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;
