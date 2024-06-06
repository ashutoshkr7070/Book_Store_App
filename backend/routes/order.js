const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");

// we want on clicking buy.. all the books from cart should removed and added to status
// admin can only change status (delivered, not available)

// Place Order
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDb = await newOrder.save();

      // saving Order in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDb._id },
      });

      // clearing cart
      await User.findByIdAndUpdate(id, { $pull: { cart: orderData._id } });
    }
    return res.json({
      status: "Success",
      message: "Order Placed Successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get oder history of particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const orderData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: orderData,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Sever Error" });
  }
});

// get all orders -- admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    // const {id} = req.headers;
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({ 
        path: "user"
      })
      .sort({ createdAt: -1 });
    return res.json({
      status: "Success",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Sever Error" });
  }
});

// Update status of orders -- admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const {id} = req.headers;
    
    await Order.findByIdAndUpdate(id, {status: req.body.status});

    return res.json({
      status: "Success",
      message: 'Status Updated Successfully',    
    });

  } catch (error) {
    res.status(500).json({ message: "Internal Sever Error" });
  }
});


module.exports = router;
