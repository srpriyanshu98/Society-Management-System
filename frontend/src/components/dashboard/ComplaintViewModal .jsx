import { getPriorityColor, getStatusColor } from "@/data/complaintsData";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import moment from "moment";

function ComplaintViewModal({ isOpen, onClose, complaint }) {
    if (!complaint) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md p-6 w-80 md:w-96 rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-start md:text-center">View Complaint</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt={complaint.complainerName}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-lg font-semibold font-poppins">
                            {complaint.complainerName}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {moment(complaint.date).format("DD/MM/YYYY")}
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <p className="text-gray-700 font-semibold font-poppins">
                        Request Name
                    </p>
                    <p className="text-gray-600">{complaint.complaintName}</p>
                </div>
                <div className="mt-4">
                    <p className="text-gray-700 font-semibold font-poppins">
                        Description
                    </p>
                    <p className="text-gray-600">{complaint.description}</p>
                </div>
                <div className="mt-4 flex space-x-4">
                    <div className="flex flex-col items-center w-15 h-5 md:w-full md:h-full">
                        <p className="text-gray-700 font-semibold font-poppins ">
                            Wing
                        </p>
                        <span className="bg-blue-100 text-blue-600 ps-5 pe-5 pt-2 pb-2 rounded-full mt-2 ">
                            {complaint.wing}
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-5 h-5 md:w-full md:h-full">
                        <p className="text-gray-700 font-semibold font-poppins">
                            Unit
                        </p>
                        <span className="ps-5 pe-5 pt-2 pb-2 mt-2 ">
                            {complaint.unit}
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-20 h-10 md:w-full md:h-full">
                        <p className="text-gray-700 font-semibold font-poppins">
                            Priority
                        </p>
                        <span
                            className={`ps-5 pe-5 pt-2 pb-2 rounded-full text-white mt-2 ${getPriorityColor(
                                complaint.priority
                            )}`}
                        >
                            {complaint.priority}
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-gray-700 font-semibold font-poppins">
                            Status
                        </p>
                        <span
                            className={`ps-5 pe-5 pt-2 pb-2 rounded-full  mt-2 ${getStatusColor(
                                complaint.status
                            )}`}
                        >
                            {complaint.status}
                        </span>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ComplaintViewModal;
