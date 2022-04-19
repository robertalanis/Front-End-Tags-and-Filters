import { useState } from "react";
import ".//StudentTags.css";

const TagsInput = ({ addTag, student }) => {

	const [tagCount, setTagCount] = useState(0);

	const newTag = (event) => {
		if (event.key === "Enter" && event.target.value !== "") {
			addTag(student, event.target.value);
			event.target.value = "";
			setTagCount(tagCount +1)
		}
	};

	return (
		<>
			<div className="tag-container">
				{student.tags.map((tag, array) => (
					<div key={array.id + tag} className="student-tag">
						{tag}
					</div>
				))}
			</div>
			<input
				className="tag-input"
				onKeyUp={(event) => newTag(event)}
				placeholder="Add a tag"
			></input>
		</>
	);
};
export default TagsInput;
