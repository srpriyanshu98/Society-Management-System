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
