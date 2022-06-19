const { Schema, model } = require("mongoose");

const listFavsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: 4,
      maxlength: 12,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required to create a Favs List"],
    },
  },
  {
    timestamps: true,
  }
);

const ListFavs = model("ListFavs", listFavsSchema);

module.exports = ListFavs;
