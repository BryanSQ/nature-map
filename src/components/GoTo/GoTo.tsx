import { type SubmitHandler, useForm } from "react-hook-form";

import { Form } from "radix-ui";

import { geocode } from "../../utils/map";

import { useMapMove, useMapMarker } from "../../hooks";

import "./GoTo.css"


type FormValue = {
    destination: string
}

export const GoTo = () => {

    const { register, handleSubmit } = useForm<FormValue>();

    const { panAndZoom } = useMapMove();
    const { placeMarker } = useMapMarker();

    const searchPlace: SubmitHandler<FormValue> = async (data) => {
        const { destination } = data;

        const geocodedDestination = await geocode(destination);

        const { location } = geocodedDestination.geometry;

        panAndZoom(location, 15);
        placeMarker(location);

    }

    return (
        <Form.Root className="FormRoot" onSubmit={handleSubmit(searchPlace)}>

            <Form.Field className="FormField" name="goto">
                <div className="form-info-container">
                    <Form.Label className="FormLabel">Where do you want to go? 👀</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        This field can't be empty.
                    </Form.Message>
                    <Form.Message className="FormMessage" match="typeMismatch">
                        Oops! We didn't expect that.
                    </Form.Message>
                </div>

                <Form.Control asChild>
                    <input className="Input" type="text" required placeholder="La Fortuna" {...register("destination")} />
                </Form.Control>

            </Form.Field>

            <Form.Submit asChild>
                <button type="submit" className="Button" style={{ marginTop: 10 }}>
                    Let's Go!
                </button>
            </Form.Submit>
        </Form.Root>
    );
};
