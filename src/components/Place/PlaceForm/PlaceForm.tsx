
import { MdDelete } from "react-icons/md";

import { useEffect, forwardRef } from "react";

import { useForm, Controller, useFieldArray } from "react-hook-form";

import { Form, Select } from "radix-ui";

import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";

import { useMarkers } from "../../../hooks/useMarkers";
import type { Place } from "../../../types";
import { reverseGeocode } from "../../../utils/map";

import categories from "../../../categories.json";

import "./PlaceForm.css";
type FormValue = {
	placeName: string;
	placeCategory: string;
	placeImages: { url: string }[];
	placeDescription: string;
};

export const PlaceForm = () => {
	const { register, handleSubmit, reset, formState, control } = useForm({
		defaultValues: {
			placeName: "",
			placeCategory: "",
			placeDescription: "",
			placeImages: [{ url: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "placeImages",
	});

	const { selectedMarker, addPlaceToMarker, selectMarker, changeMarkerIcon } =
		useMarkers();

	const addNewPlace = async (data: FormValue) => {
		if (selectedMarker?.googleMarker.position) {
			const geocodedLocation = await reverseGeocode(
				selectedMarker?.googleMarker.position,
			);

			console.log(geocodedLocation);

			let shortName = "";
			let administrativeLevel = "";
			let formattedAddress = "";

			if (geocodedLocation[0].address_components.length > 1) {
				if (geocodedLocation[0].address_components[1].short_name) {
					shortName = geocodedLocation[0].address_components[1].short_name;
				}

				if (geocodedLocation[0].address_components[2].short_name) {
					administrativeLevel = geocodedLocation[0].address_components[2].short_name;
				}
			}


			if (geocodedLocation[0].formatted_address) {
				formattedAddress = geocodedLocation[0].formatted_address;
			}


			const newPlace: Place = {
				id: uuidv4(),
				name: data.placeName,
				description: data.placeDescription,
				category: data.placeCategory,
				images: data.placeImages,
				location: [shortName, administrativeLevel, formattedAddress],
			};
			console.log(newPlace);

			if (selectedMarker) {
				addPlaceToMarker(selectedMarker?.id, newPlace);
				changeMarkerIcon(selectedMarker);
			}

			selectMarker(null);
		}
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({
				placeName: "",
				placeCategory: "",
				placeDescription: "",
				placeImages: [],
			});
		}
	}, [formState, reset]);

	return (
		<Form.Root className="form-place" onSubmit={handleSubmit(addNewPlace)}>
			<Form.Field className="form-place__field" name="placeName">
				<div className="form-place__info">
					<Form.Label className="form-place__label">
						Type this place's name
					</Form.Label>
					{formState.errors.placeName && (
						<Form.Message className="form-place__message">
							{formState.errors.placeName.message}
						</Form.Message>
					)}
				</div>

				<Form.Control asChild>
					<input
						className="form-place__input"
						type="text"
						placeholder="Type the place name here"
						{...register("placeName", {
							required: "This field can't be empty.",
						})}
					/>
				</Form.Control>
			</Form.Field>

			<Form.Field className="form-place__field" name="placeDescription">
				<div className="form-place__info">
					<Form.Label className="form-place__label">
						Write something about this place
					</Form.Label>
					{formState.errors.placeDescription && (
						<Form.Message className="form-place__message">
							{formState.errors.placeDescription.message}
						</Form.Message>
					)}
				</div>

				<Form.Control asChild>
					<input
						className="form-place__input"
						type="text"
						placeholder="Add a description..."
						{...register("placeDescription", {
							required: "This field can't be empty.",
						})}
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
					render={({ field: { value, onChange, name } }) => (
						<Select.Root name={name} value={value} onValueChange={onChange}>
							<Select.Trigger className="form-place__select-trigger">
								<Select.Value placeholder="Select a Category" />
								<Select.Icon className="form-place__select-icon">
									<ChevronDownIcon />
								</Select.Icon>
							</Select.Trigger>

							<Select.Portal>
								<Select.Content className="form-place__select-content">
									<Select.Viewport className="form-place__select-viewport">
										{categories.map((category) => (
											<SelectItem key={category} value={category}>
												{category}
											</SelectItem>
										))}
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
					{formState.errors.placeCategory && (
						<Form.Message className="form-place__message">
							Please, upload at least one image.
						</Form.Message>
					)}
				</div>
				<ul>
					{fields.map((item, index) => (
						<li key={item.id} className="form-place__url">
							<input
								className="form-place__input form-place__input-url"
								type="text"
								{...register(`placeImages.${index}.url`, {
									required: "Requerido",
								})}
							/>
							<button
								className="form-place__button--remove"
								type="button"
								onClick={() => remove(index)}
							>
								Remove URL <MdDelete />
							</button>
						</li>
					))}
				</ul>

				<button
					className="form-place__button--add"
					type="button"
					onClick={() => {
						append({ url: "" });
					}}
				>
					Add image URL
				</button>
			</Form.Field>

			<Form.Submit asChild>
				<button type="submit" className="form-place__button--accept">
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
