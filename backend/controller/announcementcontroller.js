import Announcement from "../model/announcementmodel.js";

// Create a new announcement
export const createAnnouncement = async (req, res) => {
  const { title, description, date, time } = req.body;

  try {
    const newAnnouncement = new Announcement({
      title,
      description,
      date,
      time,
    });
    await newAnnouncement.save();
    res
      .status(201)
      .json({ message: "Announcement created successfully", newAnnouncement });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating announcement", error: error.message });
  }
};

// Get all announcements
export const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching announcements", error: error.message });
  }
};

// Get a single announcement by ID
export const getAnnouncementById = async (req, res) => {
  const { id } = req.params;
  try {
    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res.status(200).json(announcement);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching announcement", error: error.message });
  }
};

// Update an announcement by ID
export const updateAnnouncement = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, time } = req.body;

  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      id,
      { title, description, date, time },
      { new: true, runValidators: true }
    );
    if (!updatedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res
      .status(200)
      .json({
        message: "Announcement updated successfully",
        updatedAnnouncement,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating announcement", error: error.message });
  }
};

// Delete an announcement by ID
export const deleteAnnouncement = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnnouncement = await Announcement.findByIdAndDelete(id);
    if (!deletedAnnouncement) {
      return res.status(404).json({ message: "Announcement not found" });
    }
    res
      .status(200)
      .json({
        message: "Announcement deleted successfully",
        deletedAnnouncement,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting announcement", error: error.message });
  }
};
