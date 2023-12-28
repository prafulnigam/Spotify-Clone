const express = require("express");
const passport = require("passport");
const router = express.Router();
const Song = require("../models/Song");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // middleware passwort is used for token authentication && session false will make the browser to not save the login
    const { name, thumbnail, track } = req.body;
    const artist = req.user._id;
    const songDetails = { name, thumbnail, track, artist };
    if (!name || !thumbnail || !track) {
      return res
        .status(301)
        .json({ err: "Insufficient details to create song." });
    }
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  }
);

// GET ROUTE TO GET ALL SONGS I HAVE PUBLISH
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const songs = await Song.find({ artist: req.user._id });
    return res.status(200).json({ data: songs });
  }
);


module.exports = router;
