import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import "./FilterCheckBox.css";
import { useMarkers } from "../../hooks/useMarkers";


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
            <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox.Root className="CheckboxRoot" id={labelText} onCheckedChange={update}>
                    <Checkbox.Indicator className="CheckboxIndicator">
                        <CheckIcon />
                    </Checkbox.Indicator>
                </Checkbox.Root>
                <label className="Label" htmlFor={labelText}>
                    {labelText}
                </label>
            </div>
        </form>
    );
};
