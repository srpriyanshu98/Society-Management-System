import Poll from "../model/pollmodel.js";

// Create a new poll
export const createPoll = async (req, res) => {
  const { question, options, createdBy } = req.body;

  if (!question || !options || options.length < 2) {
    return res
      .status(400)
      .json({ message: "Question and at least two options are required." });
  }

  try {
    const poll = new Poll({
      question,
      options: options.map((text) => ({ text })), // Format options
      createdBy,
    });

    await poll.save();
    res.status(201).json({ message: "Poll created successfully", poll });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating poll", error: error.message });
  }
};

// Get all polls
export const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.status(200).json(polls);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching polls", error: error.message });
  }
};

// Get a single poll by ID
export const getPollById = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
    res.status(200).json(poll);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching poll", error: error.message });
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
    res
      .status(500)
      .json({ message: "Error updating poll", error: error.message });
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
    res
      .status(500)
      .json({ message: "Error deleting poll", error: error.message });
  }
};