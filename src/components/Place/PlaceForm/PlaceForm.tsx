import { useEffect, forwardRef } from "react";

import { type SubmitHandler, useForm, Controller } from "react-hook-form";

import { Form, Select } from "radix-ui";

import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";

import classnames from "classnames";

import "./PlaceForm.css";

type FormValue = {
	placeName: string;
	placeCategory: string;
	placeImages: FileList;
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
	} = useForm<FormValue>();

	const addNewPlace: SubmitHandler<FormValue> = async (data) => {
		console.log("desde el dialog", data);
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({ placeName: "", placeCategory: "", placeImages: undefined });
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
							onValueChange={(newValue) => {
								setValue("placeCategory", newValue, { shouldValidate: true });
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
				<Form.Control asChild>
					<input
						className="form-place__input"
						type="file"
						accept="image/*"
						multiple
						required
						{...register("placeImages", {
							required: "You must upload at least one image.",
							validate: (files) =>
								(files && files.length > 0) ||
								"You must select at least one image.",
						})}
					/>
				</Form.Control>
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
