const axios = require("axios");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Phone = require("../models/phoneModel");

const newCouple = asyncHandler(async (req, res) => {
  const { name, desc } = req.body;

  const asArray = Object.entries(req.body);

  const phones = asArray
    .filter(([key, value]) => key.startsWith("phone"))
    .map(([key, value]) => value);

  const phone = await Phone.create({
    name,
    phones,
    description: desc,
  });

  if (phone) {
    res.status(201).json(phone);
  } else {
    res.status(400).json({ message: "Invaled phone data" });
  }
});

const getAll = asyncHandler(async (req, res) => {
  const phones = await Phone.find();

  res.status(200).json(phones);
});

const toggle = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("ID not valid");
  }

  const phone = await Phone.findOne({ _id: req.params.id });

  if (phone) {
    for (let i = 0; i < phone.phones.length; i++) {
      const url = phone.phones[i];
      await axios.get(url.replace("<toggle>", req.params.toggle));
    }
    res.status(200).json({ message: "SUCCES" });
  } else {
    res.status(400).json({ message: "ID doesn't exist" });
  }
});

const changeCouple = asyncHandler(async (req, res) => {
  const { name, desc } = req.body;

  const asArray = Object.entries(req.body);

  const phones = asArray
    .filter(([key, value]) => key.startsWith("phone"))
    .map(([key, value]) => value);

  await Phone.updateOne(
    { _id: req.params.id },
    {
      name: name,
      description: desc,
      phones: phones,
    }
  );

  res.status(204).json({ message: "SUCCES" });
});

const deleteCouple = asyncHandler(async (req, res) => {
  await Phone.deleteOne({ _id: req.params.id });
  res.status(204).json({ message: "SUCCES" });
});

module.exports = {
  newCouple,
  getAll,
  toggle,
  changeCouple,
  deleteCouple,
};
