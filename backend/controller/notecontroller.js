import Note from "../model/notemodel.js";

// Create a new note
export const createNote = async (req, res) => {
  const { title, description, date } = req.body;

  try {
    const newNote = new Note({ title, description, date });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully", newNote });
  } catch (error) {
    res.status(400).json({
      message: "Error creating note",
      error: error.message,
    });
  }
};

// Get all notes
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching notes",
      error: error.message,
    });
  }
};

// Get a single note by ID
export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching note",
      error: error.message,
    });
  }
};

// Update a note by ID
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({
      message: "Note updated successfully",
      updatedNote,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating note",
      error: error.message,
    });
  }
};
