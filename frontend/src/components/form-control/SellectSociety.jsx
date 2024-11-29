import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import CreateSociety from "@/components/form-control/society";
import axiosInstance from "../../test/axiosInstance";

export default function SelectSociety({ value, onChange }) {
    const [selectedValue, setSelectedValue] = useState(value);
    const [societies, setSocieties] = useState([]);

    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                const response = await axiosInstance.get(
                    "/societies/getSocieties"
                );
                setSocieties(response.data);
            } catch (error) {
                console.error("Error fetching societies:", error);
            }
        };

        fetchSocieties();
    }, []);

    const handleCreateSociety = (newSociety) => {
        setSocieties([...societies, newSociety]);
        onChange(newSociety._id);
    };

    return (
        <Select
            value={selectedValue}
            onValueChange={(value) => {
                setSelectedValue(value);
                onChange(value);
            }}
        >
            <SelectTrigger>
                <SelectValue
                    placeholder="Select society"
                    className="rounded-xl"
                >
                    {selectedValue
                        ? societies.find(
                              (society) => society._id === selectedValue
                          )?.societyname
                        : "Select society"}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {societies.map((society) => (
                        <SelectItem key={society._id} value={society._id}>
                            {society.societyname}
                        </SelectItem>
                    ))}
                </SelectGroup>

                {/* Create Society */}
                <Dialog>
                    <DialogTrigger className="w-full bg-gradient-to-r from-orange-600 to-orange-400 h-[51px] rounded-md text-white mt-2">
                        Create Society
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle></DialogTitle>
                        <CreateSociety onCreateSociety={handleCreateSociety} />
                    </DialogContent>
                </Dialog>
            </SelectContent>
        </Select>
    );
}
