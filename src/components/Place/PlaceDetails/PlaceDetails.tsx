import { useMarkers } from "../../../hooks/useMarkers";
import { Dialog } from "radix-ui";

import "./PlaceDetails.css"
import { Cross2Icon } from "@radix-ui/react-icons";
import { PlaceCard } from "../PlaceCard";

export const PlaceDetails = () => {
    const { detailsPlace, selectDetailsMarker } = useMarkers();

    const closeDialog = () => selectDetailsMarker(null);

    return (
        <Dialog.Root open={detailsPlace !== null}>

            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">{detailsPlace?.place?.name}</Dialog.Title>
                    <Dialog.Description className="DialogDescription">

                    </Dialog.Description>

                    {
                        detailsPlace && <PlaceCard marker={detailsPlace} />
                    }

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
    )
}