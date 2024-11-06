import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";

export default function ConfirmationDialog({
	isOpen,
	title,
	description,
	onConfirm,
	onCancel,
}) {
	return (
		<Dialog open={isOpen} onOpenChange={onCancel}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<Separator />
				<p className="text-gray-600">{description}</p>
				<div className="mt-4 flex justify-between space-x-2">
					<Button variant="outline" onClick={onCancel}>
						Cancel
					</Button>
					<Button variant="destructive" onClick={onConfirm}>
						Delete
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
