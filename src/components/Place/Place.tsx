import { type SubmitHandler, useForm } from "react-hook-form";
import { Form } from "radix-ui";
import { useEffect } from "react";


type FormValue = {
    placeName: string;

};

export const Place = () => {

    const { register, handleSubmit, reset, formState,
    } = useForm<FormValue>();

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ placeName: "" })
        }
    }, [formState, reset])

    const addNewPlace = () => { };



    return (
        <Form.Root className="FormRoot" onSubmit={handleSubmit(addNewPlace)}>

            <Form.Field className="FormField" name="placeName">
                <div className="form-info-container">
                    <Form.Label className="FormLabel">
                        What is this place called?
                    </Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        This field can't be empty.
                    </Form.Message>
                    <Form.Message className="FormMessage" match="typeMismatch">
                        Oops! We didn't expect that.
                    </Form.Message>
                </div>

                <Form.Control asChild>
                    <input
                        className="Input"
                        type="text"
                        required
                        placeholder="Type the location name here"
                        {...register("placeName")}
                    />
                </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="category">
                <div className="form-info-container">
                    <Form.Label className="FormLabel">
                        Select a category
                    </Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                        This field can't be empty.
                    </Form.Message>
                    <Form.Message className="FormMessage" match="typeMismatch">
                        Oops! We didn't expect that.
                    </Form.Message>
                </div>

                <Form.Control asChild>
                    <input
                        className="Input"
                        type=""
                        required
                        placeholder="Type the location name here"
                        {...register("placeName")}
                    />
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