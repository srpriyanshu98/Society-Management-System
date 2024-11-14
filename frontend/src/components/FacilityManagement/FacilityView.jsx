import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import moment from "moment"; // Import moment.js

export default function FacilityView({ facility, isOpen, onClose }) {
    if (!facility) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-6 rounded-xl">
                <DialogHeader>
                    <DialogTitle>View Facility Details</DialogTitle>
                </DialogHeader>
                <Separator />
                <div className="mt-4 space-y-4">
                    <div>
                        <p className="text-gray-700 font-semibold">
                            Facility Name
                        </p>
                        <p className="text-gray-600">{facility.facilityName}</p>
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">
                            Description
                        </p>
                        <p className="text-gray-600">{facility.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-700 font-semibold">
                                Service Date
                            </p>
                            <p className="text-gray-600">
                                {moment(facility.serviceDate).format(
                                    "MM/DD/YYYY"
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 font-semibold">
                                Remind Before
                            </p>
                            <p className="text-gray-600">
                                {facility.remindBefore}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
