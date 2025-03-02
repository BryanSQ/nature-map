import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Form } from "radix-ui";

import { geocode } from "../../utils/map";

import { useMapMove } from "../../hooks";

import "./GoTo.css";

type FormValue = {
	destination: string;
};

export const GoTo = () => {
	const { register, handleSubmit, reset, formState } = useForm<FormValue>();

	const { panAndZoom } = useMapMove();

	// const { placeMarker, setMarkerTitle } = useMarkers();

	const searchPlace: SubmitHandler<FormValue> = async (data) => {
		const { destination } = data;

		const geocodedDestination = await geocode(destination);

		// const { short_name: shortName } = geocodedDestination.address_components[0];
		const { location } = geocodedDestination.geometry;

		panAndZoom(location, 15);

		// desactivados para que el usuario decida donde poner el marcador

		//const newMarker = await placeMarker(location);
		//setMarkerTitle(newMarker.id, shortName);
	};

	useEffect(() => {
		if (formState.isSubmitSuccessful) {
			reset({ destination: "" });
		}
	}, [formState, reset]);

	return (
		<Form.Root className="form-goto" onSubmit={handleSubmit(searchPlace)}>
			<Form.Field className="form-goto__field" name="goto">
				<div className="form-goto__info">
					<Form.Label className="form-goto__label">
						Where do you want to go? 👀
					</Form.Label>
					<Form.Message className="form-goto__message" match="valueMissing">
						This field can't be empty.
					</Form.Message>
					<Form.Message className="form-goto__message" match="typeMismatch">
						Oops! We didn't expect that.
					</Form.Message>
				</div>

				<Form.Control asChild>
					<input
						className="form-goto__input"
						type="text"
						required
						placeholder="La Fortuna"
						{...register("destination")}
					/>
				</Form.Control>
			</Form.Field>

			<Form.Submit asChild>
				<button
					type="submit"
					className="form-goto__button"
					style={{ marginTop: 10 }}
				>
					Let's Go!
				</button>
			</Form.Submit>
		</Form.Root>
	);
};
