const { Schema, model } = require("mongoose");

const FavSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "name is required"],
      minlength: 4,
      maxlength: 12,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minlength: 4,
      maxlength: 30,
    },
    link: {
      type: String,
      required: [true, "link is required"],
    },
    listFavId: {
      type: String,
      required: [true, "ListFavs Id is required to create a Favs"],
    },
  },
  {
    timestamps: true,
  }
);

const Fav = model("Fav", FavSchema);

module.exports = Fav;
