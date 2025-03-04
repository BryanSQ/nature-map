import { useEffect, forwardRef } from "react";

import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Form, Select } from "radix-ui";

import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";

import "./PlaceForm.css";
import { useMarkers } from "../../../hooks/useMarkers";
import type { Place } from "../../../types";

type FormValue = {
	placeName: string;
	placeCategory: string;
	placeImages: { url: string }[];
};

export const PlaceForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		control,
		setValue,
		trigger,
	} = useForm({
		defaultValues: {
			placeName: "",
			placeCategory: "",
			placeImages: [{ url: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "placeImages",
	});

	const { selectedMarker, addPlaceToMarker, selectMarker } = useMarkers();

	const addNewPlace = async (data: FormValue) => {
		const newPlace: Place = {
			id: uuidv4(),
			name: data.placeName,
			category: data.placeCategory,
			images: data.placeImages,
		};
		console.log(data);

		if (selectedMarker) {
			addPlaceToMarker(selectedMarker?.id, newPlace);
		}

		selectMarker(null);
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({ placeName: "", placeCategory: "", placeImages: [] });
		}
	}, [formState, reset]);

	return (
		<Form.Root className="form-place" onSubmit={handleSubmit(addNewPlace)}>
			<Form.Field className="form-place__field" name="placeName">
				<div className="form-place__info">
					<Form.Label className="form-place__label">
						Type this place's name
					</Form.Label>
					<Form.Message className="form-place__message" match="valueMissing">
						This field can't be empty.
					</Form.Message>
					<Form.Message className="form-place__message" match="typeMismatch">
						Oops! We didn't expect that.
					</Form.Message>
				</div>

				<Form.Control asChild>
					<input
						className="form-place__input"
						type="text"
						required
						placeholder="Type the place name here"
						{...register("placeName")}
					/>
				</Form.Control>
			</Form.Field>

			<Form.Field className="form-place__field" name="placeCategory">
				<div className="form-place__info">
					<Form.Label className="form-place__label">Category</Form.Label>
					{formState.errors.placeCategory && (
						<Form.Message className="form-place__message">
							{formState.errors.placeCategory.message}
						</Form.Message>
					)}
				</div>

				{/* ask Carlos how to validate this */}
				<Controller
					control={control}
					name="placeCategory"
					rules={{ required: "You must select a category." }}
					render={({ field: { value } }) => (
						<Select.Root
							name="placeCategory"
							value={value}
							onValueChange={(value) => {
								setValue("placeCategory", value, { shouldValidate: true });
								trigger("placeCategory");
							}}
						>
							<Select.Trigger className="form-place__select-trigger">
								<Select.Value placeholder="Select a Category" />
								<Select.Icon className="form-place__select-icon">
									<ChevronDownIcon />
								</Select.Icon>
							</Select.Trigger>

							<Select.Portal>
								<Select.Content className="form-place__select-content">
									<Select.Viewport className="form-place__select-viewport">
										<SelectItem value="forest">Forest</SelectItem>
										<SelectItem value="beach">Beach</SelectItem>
										<SelectItem value="mountain">Mountain</SelectItem>
										<SelectItem value="river">River</SelectItem>
										<SelectItem value="lake">Lake</SelectItem>
									</Select.Viewport>
								</Select.Content>
							</Select.Portal>
						</Select.Root>
					)}
				/>
			</Form.Field>

			<Form.Field className="form-place__field" name="placeImages">
				<div className="form-place__info">
					<Form.Label className="form-place__label">Upload image(s)</Form.Label>
					<Form.Message className="form-place__message" match="valueMissing">
						Please, upload at least one image.
					</Form.Message>
				</div>
				<ul>
					{fields.map((item, index) => (
						<li key={item.id}>
							<input
								className="form-place__input"
								type="text"
								required
								{...register(`placeImages.${index}.url`)}
							/>
							<button type="button" onClick={() => remove(index)}>
								Remove image URL
							</button>
						</li>
					))}
				</ul>

				<button
					type="button"
					onClick={() => {
						append({ url: "" });
					}}
				>
					Add image URL
				</button>
			</Form.Field>

			<Form.Submit asChild>
				<button type="submit" className="form-place__button">
					Save
				</button>
			</Form.Submit>
		</Form.Root>
	);
};

const SelectItem = forwardRef<
	React.ComponentRef<typeof Select.Item>,
	React.ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
	return (
		<Select.Item
			className={classnames("form-place__select-item", className)}
			{...props}
			ref={forwardedRef}
		>
			<Select.ItemText>{children}</Select.ItemText>
			<Select.ItemIndicator className="SelectItemIndicator">
				<CheckIcon />
			</Select.ItemIndicator>
		</Select.Item>
	);
});
