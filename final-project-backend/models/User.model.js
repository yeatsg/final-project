const { Schema, model } = require("mongoose");
const countryList = require("./countryList");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    spotifyId: {
      type: String,
    },
    country: {
      type: String,
      enum: countryList,
      default: "United States of America (the)",
    },
    spotifyAccountType: {
      type: String,
      default: "free",
    },
    pictureUrl: {
      type: String,
      default:
        "https://cdn4.vectorstock.com/i/thumb-large/28/63/profile-placeholder-image-gray-silhouette-vector-21542863.jpg",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
