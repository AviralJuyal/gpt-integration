const mongoose = require("mongoose");

const booksSchema = mongoose.Schema(
    {
      question: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("question", booksSchema);