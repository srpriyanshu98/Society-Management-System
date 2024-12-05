import Poll from "../model/pollmodel.js";
import Resident from "../model/residentmodel.js";
import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
// Create a new poll

export const createPoll = async (req, res) => {
  const { question, options } = req.body;

  // Extract the resident ID from the request
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    const createdById = decoded.id; // Extract the user ID from the token

    if (!question || !options || options.length < 2) {
      return res.status(400).json({
        message: "Question and at least two options are required.",
      });
    }

    const poll = new Poll({
      question,
      options: options.map((text) => ({ text })), // Map options to include text
      createdById,
    });

    await poll.save();

    // Populate the 'createdById' field with the 'fullName' from the Resident model
    const populatedPoll = await Poll.findById(poll._id).populate({
      path: "createdById",
      select: "fullName", // Only retrieve the fullName field
    });

    res.status(201).json({
      message: "Poll created successfully",
      poll: populatedPoll,
    });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({
      message: "Error creating poll",
      error: error.message,
    });
  }
};

// Get all polls
export const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching polls",
      error: error.message,
    });
  }
};

export const getPollById = async (req, res) => {
  try {
    // Find the poll by ID and populate the 'createdById' field with the 'fullName'
    const poll = await Poll.findById(req.params.id).populate({
      path: "createdById",
      select: "fullName", // Retrieve only the fullName field
    });

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.status(200).json(poll);
  } catch (error) {
    console.error("Error fetching poll:", error);
    res.status(500).json({
      message: "Error fetching poll",
      error: error.message,
    });
  }
};

// Update a poll
export const updatePoll = async (req, res) => {
  const { question, options } = req.body;

  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    if (question) poll.question = question;
    if (options) {
      poll.options = options.map((text, index) => ({
        text,
        votes: poll.options[index] ? poll.options[index].votes : 0, // Preserve votes
      }));
    }

    await poll.save();
    res.status(200).json({ message: "Poll updated successfully", poll });
  } catch (error) {
    res.status(500).json({
      message: "Error updating poll",
      error: error.message,
    });
  }
};

// Delete a poll
export const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting poll",
      error: error.message,
    });
  }
};
export const votePoll = async (req, res) => {
  const { id } = req.params;
  const { optionText } = req.body;

  try {
    const poll = await Poll.findById(id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    const option = poll.options.find((opt) => opt.text === optionText);
    if (!option) {
      return res.status(400).json({ message: "Invalid option" });
    }

    option.votes += 1;
    poll.totalVotes += 1;

    await poll.save();
    res.status(200).json({ message: "Vote recorded successfully", poll });
  } catch (error) {
    res.status(500).json({
      message: "Error recording vote",
      error: error.message,
    });
  }
};
