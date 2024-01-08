const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");

// ROUTE 1 : CREATE A PLAYLIST
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { name, thumbnail, songs } = req.body;
    if (!name || !thumbnail || !songs)
      return res.status(301).json({ err: "Insufficient Data" });
    const playlistData = {
      name,
      thumbnail,
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
  "/get/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist) return res.status(404).json({ err: "Invalid ID" });
    return res.status(200).json(playlist);
  }
);

// ROUTE 3 : GET ALL PLAYLISTS MADE BY AN ARTIST
router.get(
  "/get/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const artistId = req.params.artistId;
    const artist = await User.findOne({ _id: artistId });
    if (!artist) res.status(304).json({ err: "Inavlid Artist Id" });
    const playlists = await Playlist.find({ owner: artistId });
    return res.status(200).json({ data: playlists });
  }
);

// ROUTE 4 : ADD A SONG TO A PLAYLIST
router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const currentUser = req.user;
    const { playlistId, songId } = req.body;

    // STEP 0 : GET THE PLAYLIST IF VALID
    const playlist = await Playlist.findOne({ _id: playlistId });
    if (!playlist)
      return res.status(304).json({ err: "Playlist Does Not Exist" });

    // Step 1 : check if CurrentUser owns the playlist or is a collaborator
    if (
      !playlist.owner.equals(currentUser._id) && // because ids here are object & cannot be compared by == 
      !playlist.collaborators.includes(currentUser._id)
    )
      return res.status(400).json({ err: "Not allowed" });

    // Step 2 : check if song is valid
    const song = await Song.findOne({ _id: songId });
    if (!song) return res.status(304).json({ err: "Song Does Not Exist" });

    // Add the song
    playlist.songs.push(songId);
    await playlist.save(); // save in database

    return res.status(200).json(playlist);
  }
);

module.exports = router;
