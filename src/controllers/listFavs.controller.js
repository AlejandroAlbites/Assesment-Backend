const ListFavs = require("../models/listFavs.model");
const User = require("../models/user.model");
const Fav = require("../models/fav.model");

const create = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Invalid user");
    }
    const listFavs = await ListFavs.create({ ...req.body, user: user._id });

    await User.updateOne(
      { _id: user._id },
      {
        $push: { listFavs: listFavs },
      }
    );
    res
      .status(200)
      .json({ ok: true, message: "List favs created", data: listFavs });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ ok: false, message: "List favs could not be create" });
  }
};

const list = async (req, res) => {
  try {
    const { userId } = req;
    const listFavs = await ListFavs.find({ user: userId }).populate(
      "Favs",
      "title description link"
    );

    res
      .status(200)
      .json({ ok: true, message: "List Favs found", listFavs: listFavs });
  } catch (err) {
    res
      .status(404)
      .json({ ok: false, message: "List Favs not found", data: err });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Invalid user");
    }
    const listFav = await ListFavs.findById(id).populate(
      "Favs",
      "title description link"
    );

    if (listFav.user.toString() !== user._id.toString()) {
      throw new Error("list fav does not belong to this user");
    }

    res
      .status(200)
      .json({ ok: true, message: "List Fav found", data: listFav });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ ok: false, message: "List Fav not found", data: err });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Invalid user");
    }
    const listFav = await ListFavs.findById(id);

    if (listFav.user.toString() !== user._id.toString()) {
      throw new Error("list fav does not belong to this user");
    }

    const favs = await Fav.find({ listFavId: listFav._id });

    if (favs.length > 0) {
      await Fav.deleteMany({ listFavId: listFav._id });
    }
    await ListFavs.findByIdAndDelete(listFav._id);
    await User.updateOne(
      { _id: user._id },
      {
        $pull: { listFavs: listFav._id },
      }
    );

    res
      .status(200)
      .json({ ok: true, message: "list Fav deleted", data: listFav });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ ok: false, message: "List Fav could not be deleted", data: err });
  }
};

module.exports = {
  create,
  list,
  show,
  destroy,
};
