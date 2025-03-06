import { AlertDialog } from "radix-ui";
import { MdDelete } from "react-icons/md";

import "./DeleteDialog.css";

interface IDeleteDialogProps {
	buttonFunction: () => void;
}

export const DeleteDialog = ({ buttonFunction }: IDeleteDialogProps) => {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<button type="button" className="delete-dialog__button--green">
					<MdDelete />
				</button>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="delete-dialog__overlay" />
				<AlertDialog.Content className="delete-dialog__content">
					<AlertDialog.Title className="delete-dialog__title">
						Are you absolutely sure?
					</AlertDialog.Title>
					<AlertDialog.Description className="delete-dialog__description">
						This action cannot be undone. This will permanently delete this
						place from the map.
					</AlertDialog.Description>
					<div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
						<AlertDialog.Cancel asChild>
							<button
								type="button"
								className="delete-dialog__button delete-dialog__button--gray"
							>
								Cancel
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								onClick={buttonFunction}
								type="button"
								className="delete-dialog__button delete-dialog__button--red"
							>
								Yes, delete place
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};
