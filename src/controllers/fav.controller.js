const ListFavs = require("../models/listFavs.model");
const Fav = require("../models/fav.model");
const User = require("../models/user.model");

const create = async (req, res) => {
  try {
    const { listFavId } = req.body;
    const { userId } = req;

    const listFav = await ListFavs.findById(listFavId);

    if (!listFav) {
      throw new Error("Invalid listFav");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Invalid user");
    }

    if (listFav.user.toString() !== user._id.toString()) {
      throw new Error("list fav does not belong to this user");
    }

    const fav = await Fav.create({ ...req.body });

    await ListFavs.updateOne(
      { _id: listFav._id },
      {
        $push: { Favs: fav },
      }
    );
    res.status(200).json({ ok: true, message: "Favs created", data: fav });
  } catch (err) {
    console.log(err);
    res.status(404).json({ ok: false, message: "Favs could not be create" });
  }
};

const list = async (req, res) => {
  try {
    const favs = await Fav.find();

    res.status(200).json({ ok: true, message: "Favs found", Favs: favs });
  } catch (err) {
    console.log(err);
    res.status(404).json({ ok: false, message: "Favs not found", data: err });
  }
};

const show = async (req, res) => {
  try {
    const { favId } = req.params;
    const fav = await Fav.findById(favId);
    if (!fav) {
      throw new Error("Invalid fav");
    }

    res.status(200).json({ ok: true, message: "List Fav found", data: fav });
  } catch (err) {
    res
      .status(404)
      .json({ ok: false, message: "List Fav not found", data: err });
  }
};

const destroy = async (req, res) => {
  try {
    const { favId } = req.params;
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Invalid user");
    }
    const fav = await Fav.findById(favId);
    if (!fav) {
      throw new Error("Invalid fav");
    }
    const listFav = await ListFavs.findById(fav.listFavId);

    if (listFav.user.toString() !== user._id.toString()) {
      throw new Error("list fav does not belong to this user");
    }
    await Fav.findByIdAndDelete(fav._id);
    await ListFavs.updateOne(
      { _id: listFav._id },
      {
        $pull: { Favs: fav },
      }
    );

    res.status(200).json({ ok: true, message: "Fav deleted", data: fav });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ ok: false, message: "Fav could not be deleted", data: err });
  }
};

module.exports = {
  create,
  list,
  show,
  destroy,
};
