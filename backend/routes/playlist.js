const express = require("express");
const router = express.router();
const passport = require("passport");
const Playlist = require("../models/Playlist");

// ROUTE 1 : CREATE A PLAYLIST
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thubnail, songs } = req.body;
    if (!name || !thumbnail || !songs)
      return res.status(301).json({ err: "Insufficient Data" });
    const playlistData = {
      name,
      thubnail,
      songs,
      owner: currentUser._id,
      collaborators: [],
    };
    const playlist = await Playlist.create(playlistData);
    return res.status(200).json(playlist);
  }
);

// ROUTE 2 : GET A PLAYLIST BY ID
// WE WILL GET THE PLAYLIST ID AS A ROUTE PARAMETER & WE WILL RETURN THE PLAYLIST
// : is used for making playlistId a variable
router.get(
  "/get/:playlistId",
  passport.authenticate("jwt"),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) res.status(301).json({ err: "Inavlid ID" });
    return res.status(200).json(playlist);
  }
);

module.exports = router;
