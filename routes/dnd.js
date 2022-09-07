const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  newCouple,
  getAll,
  toggle,
  deleteCouple,
  changeCouple,
} = require("../controllers/dndController");
const router = express.Router();

router.get("/all", protect, getAll);
router.get("/toggle/:id/:toggle", toggle);

router.post("/newCouple", protect, newCouple);

router.put("/updateCouple/:id", protect, changeCouple);

router.delete("/deleteCouple/:id", protect, deleteCouple);

module.exports = router;
