const ListFavs = require("../models/listFavs.model");
const User = require("../models/user.model");

// CREATE - POST

const create = async (req, res) => {
  try {
    const { _id } = req;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("Invalid user");
    }
    const listFavs = await ListFavs.create({ ...req.body, user: _id });

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
    const listFavs = await ListFavs.find();

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
    const listFav = await ListFavs.findById(id);

    res
      .status(200)
      .json({ ok: true, message: "List Fav found", data: listFav });
  } catch (err) {
    res
      .status(404)
      .json({ ok: false, message: "List Fav not found", data: err });
  }
};

const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invalid user");
    }
    const listFav = await ListFavs.findById(id);

    if (listFav.user.toString() !== user._id.toString()) {
      throw new Error("list fav does not belong to this user");
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
