import categories from "../../categories.json";
import { FilterCheckbox } from "../FilterCheckbox";

import "./Filter.css";

export const Filter = () => {
	return (
		<div className="filter-container">
			{categories.map((category) => (
				<FilterCheckbox key={category} labelText={category} />
			))}
		</div>
	);
};
