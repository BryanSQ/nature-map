import { Form } from "radix-ui";

import "./GoTo.css"

export const GoTo = () => {
    return (
        <Form.Root className="FormRoot">

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
                    <input className="Input" type="text" required placeholder="La Fortuna" />
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
