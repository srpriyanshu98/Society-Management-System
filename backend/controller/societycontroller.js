import Society from "../model/societymodel.js";

export const createSociety = async (req, res) => {
  const { societyname, societyaddress, country, state, city, zipcode } =
    req.body;

  try {
    const newSociety = new Society({
      societyname,
      societyaddress,
      country,
      state,
      city,
      zipcode,
    });
    await newSociety.save();
    res
      .status(201)
      .json({ message: "Society created successfully", society: newSociety });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating society", error: error.message });
  }
};

export const getSocieties = async (req, res) => {
  try {
    const societies = await Society.find();
    res.status(200).json(societies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching societies", error: error.message });
  }
};

// Get a single society by ID
export const getSocietyById = async (req, res) => {
  try {
    const society = await Society.findById(req.params.id);
    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }
    res.status(200).json(society);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a society by ID
export const updateSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }
    res.status(200).json(society);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a society by ID
export const deleteSociety = async (req, res) => {
  try {
    const society = await Society.findByIdAndDelete(req.params.id);
    if (!society) {
      return res.status(404).json({ message: "Society not found" });
    }
    res.status(200).json({ message: "Society deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
