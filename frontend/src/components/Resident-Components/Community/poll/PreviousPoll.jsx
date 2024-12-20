import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import axiosInstance from "@/test/axiosInstance";
import {
    fetchPolls,
    categorizePollsByDate,
    getLoggedInUser,
} from "@/components/services/pollUtils";

export default function PreviousPoll() {
    const [previousPolls, setPreviousPolls] = useState([]);
    const [votedPolls, setVotedPolls] = useState({});
    const loggedInUser = getLoggedInUser();

    useEffect(() => {
        const getPreviousPolls = async () => {
            const data = await fetchPolls();
            const { previousPolls } = categorizePollsByDate(data);
            setPreviousPolls(previousPolls);
        };

        getPreviousPolls();

        const interval = setInterval(() => {
            getPreviousPolls();
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    const handleVote = async (pollId, optionText) => {
        try {
            await axiosInstance.post(`/polls/${pollId}/vote`, { optionText });

            setPreviousPolls((prevPolls) =>
                prevPolls.map((poll) => {
                    if (poll._id === pollId) {
                        const previousVote = votedPolls[pollId];
                        const newOptions = poll.options.map((option) => {
                            if (option.text === previousVote) {
                                return { ...option, votes: option.votes - 1 };
                            }
                            if (option.text === optionText) {
                                return { ...option, votes: option.votes + 1 };
                            }
                            return option;
                        });

                        const totalVotesAdjustment = previousVote ? 0 : 1;

                        return {
                            ...poll,
                            options: newOptions,
                            totalVotes: poll.totalVotes + totalVotesAdjustment,
                        };
                    }
                    return poll;
                })
            );

            setVotedPolls((prevVotedPolls) => ({
                ...prevVotedPolls,
                [pollId]: optionText,
            }));
        } catch (error) {
            console.error("Error voting:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Previous Polls</CardTitle>
            </CardHeader>
            <CardContent>
                {previousPolls.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No previous polls available.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {previousPolls.map((poll) => (
                            <Card
                                key={poll._id}
                                className="shadow rounded-lg p-4"
                            >
                                {/* Header Section */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <Avatar className="w-10 h-10">
                                            <AvatarImage
                                                src="https://github.com/shadcn.png"
                                                alt={
                                                    loggedInUser?.username ||
                                                    "User"
                                                }
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-lg font-bold">
                                                {loggedInUser?.username ||
                                                    "User"}
                                            </h3>
                                            <span className="text-sm text-gray-500">
                                                {poll.type}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="bg-blue-300 text-sm px-2 py-1 rounded-full grid grid-cols-2 gap-1 items-center space-x-1 text-white">
                                        <div>
                                            <Eye />
                                        </div>
                                        <span>20</span>
                                    </span>
                                </div>

                                <Separator />

                                {/* Question Section */}
                                <div className="my-4">
                                    <p className="text-sm font-medium mb-5">
                                        {poll.question}
                                    </p>
                                    <form className="space-y-4">
                                        {poll.options.map((option) => {
                                            const percentage =
                                                poll.totalVotes > 0
                                                    ? Math.round(
                                                          (option.votes /
                                                              poll.totalVotes) *
                                                              100
                                                      )
                                                    : 0;
                                            return (
                                                <div
                                                    key={option.text}
                                                    className="space-y-2"
                                                >
                                                    <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
                                                        <label className="space-x-2">
                                                            <input
                                                                type="radio"
                                                                name={`poll-${poll._id}`}
                                                                onChange={() =>
                                                                    handleVote(
                                                                        poll._id,
                                                                        option.text
                                                                    )
                                                                }
                                                                className="radio"
                                                                checked={
                                                                    votedPolls[
                                                                        poll._id
                                                                    ] ===
                                                                    option.text
                                                                }
                                                            />
                                                            <span className="text-sm">
                                                                {option.text}
                                                            </span>
                                                        </label>
                                                        <div className="grid grid-cols-2 -space-x-2">
                                                            <Avatar className="w-5 h-5 border border-white">
                                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                                <AvatarFallback>
                                                                    CN
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <Avatar className="w-5 h-5 border border-white">
                                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                                <AvatarFallback>
                                                                    CN
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="text-xs text-gray-600">
                                                            {option.votes}
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <Progress
                                                            value={percentage}
                                                            color={
                                                                percentage >= 50
                                                                    ? "green"
                                                                    : "red"
                                                            }
                                                            className="w-full h-2"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </form>
                                </div>

                                <Separator />

                                <CardFooter className="pt-4">
                                    <div className="text-xs text-gray-400">
                                        {new Date(
                                            poll.createdAt
                                        ).toLocaleDateString()}{" "}
                                        {new Date(
                                            poll.createdAt
                                        ).toLocaleTimeString()}
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
