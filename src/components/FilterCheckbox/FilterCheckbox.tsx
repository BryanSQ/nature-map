import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
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
        <form>
            <div className="checkbox">
                <Checkbox.Root id={labelText} onCheckedChange={update}>
                </Checkbox.Root>
                <label className="checkbox__label" htmlFor={labelText}>
                    {labelText}
                </label>
            </div>
        </form>
    );
};
