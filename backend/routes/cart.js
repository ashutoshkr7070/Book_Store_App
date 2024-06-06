const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add book to cart
router.put("/add-to-cart", authenticateToken, async (req, res) => {
  try {
    const { bookid, id } = req.headers;
    const userData = await User.findById(id);
    const isBookInCart = userData.cart.includes(bookid);
    if (isBookInCart)
      return res.status(200).json({ message: "book is already in Cart" });

    await User.findByIdAndUpdate(id, { $push: { cart : bookid } });
    return res.status(200).json({ message: "book added to Cart" });
  } catch (error) {
    res.status(500).json({ message: "internal Server error" });
  }
});

// Remove book from Cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
  try {
    const {bookid} = req.params;
    const { id } = req.headers;
    await User.findByIdAndUpdate(id, {$pull: {cart: bookid}})    
    return res.status(200).json({ message: "book removed from Cart" });

  } catch (error) {
    res.status(500).json({ message: "internal Server error" });
  }
});

// remove book from cart (via headers)
// router.put("/remove-from-cart", authenticateToken, async (req, res) => {
//   try {
//     const { bookid, id } = req.headers;
//     const userData = await User.findById(id);

//     const isBookInCart = userData.cart.includes(bookid);
//     if (isBookInCart)
//       await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });

//     return res.status(200).json({ message: "book removed from Cart" });
//   } catch (error) {
//     res.status(500).json({ message: "internal Server error" });
//   }
// });

// show all books in cart
router.get("/get-user-cart", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("cart");  // populate to the book refered from user to book and show the fav books
    const cart = userData.cart.reverse();  // newly added book on top
    return res.json({ status: "success", data: cart });
  } catch (error) {
    res.status(500).json({ message: "internal Server error" });
  }
});


module.exports = router;