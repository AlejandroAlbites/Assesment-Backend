const { Schema, model } = require("mongoose");

const listFavsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 4,
      maxlength: 20,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required to create a Favs List"],
    },
    Favs: {
      type: [Schema.Types.Object],
      ref: "Fav",
    },
  },
  {
    timestamps: true,
  }
);

const ListFavs = model("ListFavs", listFavsSchema);

module.exports = ListFavs;
