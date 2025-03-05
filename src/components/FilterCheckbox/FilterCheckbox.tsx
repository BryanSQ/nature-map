import { Checkbox } from "radix-ui";

import { useMarkers } from "../../hooks/useMarkers";

import "./FilterCheckBox.css";


interface IFilterCheckboxProps {
    labelText: string;
}

export const FilterCheckbox = ({ labelText }: IFilterCheckboxProps) => {

    const { filterCategories, updateCategories } = useMarkers();

    const update = () => {
        const filterExists = filterCategories.findIndex((category) => category === labelText);

        if (filterExists === -1) {
            const newCategories = filterCategories.concat(labelText);
            updateCategories(newCategories);
            return;
        }

        const newCategories = filterCategories.filter((category) => category !== labelText);
        updateCategories(newCategories);
        return;
    }

    return (
        <div className="checkbox">
            <Checkbox.Root id={labelText} onCheckedChange={update} className="checkbox-root">
            </Checkbox.Root>
            <label className="checkbox__label" htmlFor={labelText}>
                {labelText}
            </label>
        </div>
    );
};
