import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import StudentTags from "../../components/StudentTags/StudentTags";

import "./StudentCard.css";

function StudentInfo({
	student,
	student: { id, pic, firstName, lastName, email, company, skill, grades },
	addTag,
}) {
	const [open, setOpen] = useState(false);

	//function to calculate average of grades
	function calculateAverage(array) {
		var total = 0;
		var count = 0;
		array.forEach(function (item, index) {
			total += parseFloat(item);
			count++;
		});
		return (total / count).toFixed(2);
	}

	return (
		<div className="container">
			<div className="card-image">
				<img src={pic} alt={firstName + " " + lastName + "'s profile photo"} />
			</div>
			<div className="card-body">
				<h2 className="student-name">
					{firstName.toUpperCase()} {lastName.toUpperCase()}
				</h2>
				<div className="student-info">
					<ul>
						<li>Email: {email}</li>
						<li>Company: {company}</li>
						<li>Skill: {skill}</li>
						<li>Average: {calculateAverage(grades)}%</li>
					</ul>
					{open && (
						<table>
							<tbody>
								{grades.map((grade, index) => (
									<tr key={index} id={"collapse-card_" + id}>
										<td>Test {index + 1}:</td>
										<td>{grade}%</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
					<StudentTags addTag={addTag} student={student}></StudentTags>
				</div>
			</div>
			<div className="card-collapse">
				<button
					onClick={() => setOpen(!open)}
					aria-controls={"collapse-card_" + id}
					aria-expanded={open}
				>
					{open ? <FaMinus /> : <FaPlus />}
				</button>
			</div>
		</div>
	);
}

export default StudentInfo;
