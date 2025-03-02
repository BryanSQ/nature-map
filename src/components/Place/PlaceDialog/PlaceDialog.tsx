import { Dialog } from "radix-ui";
import { Cross2Icon } from "@radix-ui/react-icons";

import { PlaceForm } from "../PlaceForm";

import "./PlaceDialog.css";
import { useMarkers } from "../../../hooks/useMarkers";

export const PlaceDialog = () => {
	const { selectedMarker, selectMarker } = useMarkers();

	const closeDialog = () => selectMarker(null);

	return (
		<Dialog.Root open={selectedMarker !== null}>
			{/* <Dialog.Trigger asChild>
			<button type="button" className="Button violet">
				Edit profile
			</button>
		</Dialog.Trigger> */}

			<Dialog.Portal>
				<Dialog.Overlay className="DialogOverlay" />
				<Dialog.Content className="DialogContent">
					<Dialog.Title className="DialogTitle">Add a new place</Dialog.Title>
					<Dialog.Description className="DialogDescription">
						Make changes to your place here. Click save when you're done.
					</Dialog.Description>

					<PlaceForm />

					<Dialog.Close asChild>
						<button
							className="IconButton"
							type="button"
							aria-label="Close"
							onClick={closeDialog}
						>
							<Cross2Icon />
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
