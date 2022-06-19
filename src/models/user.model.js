const { Schema, model, models } = require("mongoose");
const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      match: [emailRegex, "email is not valid"],
      validate: {
        async validator(email) {
          const user = await models.User.findOne({ email });
          return !user;
        },
        message: "email already exists",
      },
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
