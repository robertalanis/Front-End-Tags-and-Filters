import { useEffect, useState } from "react";
import StudentCard from "./components/StudentCard/StudentCard";

import "./App.css";

function App() {
	const [data, setData] = useState({});
	const [loading, setloading] = useState(false);
	const [error, setError] = useState();

	//Track user input
	const [nameQuery, setNameQuery] = useState("");
	const [tagQuery, setTagQuery] = useState("");
	//Add tag to student
	function addTag(student, newTag) {
		const dataWithNewTag = data;
		dataWithNewTag.forEach((person) => {
			if (person.id === student.id) {
				person.tags.push(newTag);
			}
		});
		setData(dataWithNewTag);
	}

	//Fetch data from API
	useEffect(() => {
		setloading(true);
		fetch(`https://api.hatchways.io/assessment/students`)
			.then((res) => res.json())
			.then((data) => {
				//Add tag field for each student
				const students = data.students;
				students.forEach((student) => {
					student.tags = [];
				});
				setData(students);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setloading(false);
			});
	}, []);

	// API loading message
	if (loading) {
		return (
			<div className="app-container">
				<h1 className="status-message">data is loading...</h1>
			</div>
		);
	}

	//Error message is API data is not an array
	if (error || !Array.isArray(data)) {
		return (
			<div className="app-container">
				<h1 className="status-message">there was an error loading your data!</h1>
			</div>
		);
	}

	//App
	return (
		<div className="app-container">
			{/* Collect user input */}
			<div id="search-container">
				<input
					onChange={(event) => setNameQuery(event.target.value)}
					placeholder="Search by name"
				></input>
				<input
					onChange={(event) => setTagQuery(event.target.value)}
					placeholder="Search by tag"
				></input>
			</div>
			{/* Filter data based on input */}
			<div className="card-container">
				{data
					.filter((student) => {
						{/* Strings to compare user imput against */}
						var firstAndLastNameStr = (student.firstName + " " + student.lastName)
							.toLowerCase()
							.includes(nameQuery.toLowerCase());
						var tagStr = student.tags.some((tag) =>
							tag.toLowerCase().includes(tagQuery.toLowerCase())
						);
						{/* Logic to compare input */}
						if (nameQuery === "" && tagQuery === "") {
							return student;
						} else if (tagQuery === "" && firstAndLastNameStr) {
							return student;
						} else if (nameQuery === "" && tagStr) {
							return student;
						} else if (firstAndLastNameStr && tagStr) {
							return student;
						}
					})
					.map((student, index) => (
						<>
							<StudentCard
								key={student.id}
								student={student}
								addTag={addTag}
							></StudentCard>
						</>
					))}
			</div>
		</div>
	);
}

export default App;
