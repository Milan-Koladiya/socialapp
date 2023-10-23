const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: [true, "Product Title Is Must Require"],
      minlength: [3, "Please Add more then 3 character of product name"],
      maxlength: [50, "Product name is must not be more then 50 character"],
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    like: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    comments: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],
    file: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);


const likeProduct = async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (product.like.includes(req.user.id)) {
      product.like = product.like.filter(
        (like) => like.toString() !== req.user.id.toString()
      );
      await product.save();
      return res.json({
        status: "success",
        message: "UnLike A Product",
        like: product.like,
        userId: req.user.id,
      });
    }
    product.like.push(req.user.id);
    await product.save();
    res.json({
      status: "success",
      message: "Like A Product",
      like: product.like,
      userId: req.user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};