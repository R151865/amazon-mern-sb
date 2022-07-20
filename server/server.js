const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const {
  UserModal,
  ProductModal,
  OrderModal,
  TransactionModal,
} = require("./modal.js");
const createData = require("./createData.js");

// Middle wares section
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const PORT = process.env.PORT || 3005;

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const mongoConnectionUrl =
  "mongodb+srv://sulthan:sulthan@cluster0.z7rym.mongodb.net/?retryWrites=true&w=majority";

const initializeMongoDbAndServer = async () => {
  try {
    mongoose
      .connect(mongoConnectionUrl)
      .then(() => console.log("Mongoose DB Connected"));

    app.listen(PORT, () =>
      console.log(`server running at http://localhost:${PORT}`)
    );

    createData();
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeMongoDbAndServer();

// jwt middle ware
const authenticateAccessToken = (request, response, next) => {
  let jwtToken;
  const authHeaders = request.headers["authorization"];
  if (authHeaders !== undefined) {
    jwtToken = authHeaders.split(" ")[1];
  }

  if (jwtToken == undefined) {
    return response.status(401).send({ message: "No access" });
  }

  jwt.verify(jwtToken, "AMAZON", (err, user) => {
    if (err) {
      return response.status(401).send({ message: "No access" });
    } else {
      request.userDetails = user;
      next();
    }
  });
};

const adminAuth = (request, response, next) => {
  const isAdmin = request.userDetails.isAdmin;
  if (isAdmin === false) {
    return response.status(401).send({ message: "Admin access only" });
  }
  next();
};

// API section

// Get Products Feed
app.get("/feed", authenticateAccessToken, async (request, response) => {
  const products = await ProductModal.find();
  response.send(products);
});

// Get User Orders API
app.get("/orders", authenticateAccessToken, async (request, response) => {
  // get user details from jwt token
  const userId = request.userDetails.user_id;

  // get  users orders
  const orders = await OrderModal.find({ user_id: userId });

  // based on user orders product id get products details
  const product_ids = orders.map((each) => each.product_id);
  const products = await ProductModal.find({
    product_id: {
      $in: product_ids,
    },
  });

  const mergedProductsAndOrder = orders.map((each) => {
    const index = products.findIndex((prod) => prod._id == each.product_id);
    const product = products[index];

    return {
      order_id: each._id,
      timestamp: each.timestamp,
      quantity: each.quantity,
      is_delivered: each.is_delivered,
      product_id: each.product_id,
      user_id: each.user_id,
      title: product.title,
      price: product.price,
      rating: product.rating,
      image_url: product.image_url,
      percentage_off: product.percentage_off,
    };
  });

  // sending to them
  response.send(mergedProductsAndOrder);
});

// Post Order API
app.post("/orders", authenticateAccessToken, async (request, response) => {
  // get user id
  const user_id = request.userDetails.user_id;
  //  get body data user
  const { productsData, amount, phoneNumber, address, transactionImageUrl } =
    request.body;

  const date = new Date();
  const ordersData = productsData.map((each) => ({
    ...each,
    timestamp: date,
    user_id,
  }));

  const orders = await OrderModal.insertMany(ordersData);

  const orderIds = orders.map((each) => each._id);

  // create transaction
  const transData = {
    user_id,
    phone_number: phoneNumber,
    address,
    transaction_date: date,
    transaction_image_url: transactionImageUrl,
    transaction_status: "PENDING",
    order_ids: orderIds,
    amount,
  };

  await TransactionModal.create(transData);

  response.send("Orders added");
});

// Get Transaction API
app.get("/transactions", authenticateAccessToken, async (request, response) => {
  // get user id
  const user_id = request.userDetails.user_id;

  // get transactions
  const transactions = await TransactionModal.find({ user_id });
  // send transactions
  response.send(transactions);
});

// Login API
app.post("/login", async (request, response) => {
  const { username, password } = request.body;

  const dbUser = await UserModal.findOne({
    email: username,
    password: password,
  });

  if (dbUser == undefined) {
    return response.status(400).send({ message: "Invalid credentials" });
  }

  const payLoad = {
    user_id: dbUser._id,
    name: dbUser.name,
    email: dbUser.email,
    isAdmin: dbUser.is_admin,
    password: dbUser.password,
  };
  const jwtToken = jwt.sign(payLoad, "AMAZON");

  const userDetails = {
    user_id: dbUser._id,
    name: dbUser.name,
    email: dbUser.email,
    isAdmin: dbUser.is_admin,
  };

  response.status(200).send({ jwtToken, userDetails });
});

// Register API
app.post("/signup", async (request, response) => {
  const { name, username, password, is_admin = false } = request.body;

  const dbUser = await UserModal.findOne({
    email: username,
    password: password,
  });

  if (dbUser !== null) {
    return response.status(400).send({ message: "Username already exists" });
  }

  if (password.length < 4) {
    return response
      .status(400)
      .send({ message: "Password length should greater than 3 chars" });
  }

  const user = await UserModal.create({
    name,
    email: username,
    password,
    is_admin,
  });

  response.send("User Added");
});

// Create Product API
app.post(
  "/products",
  authenticateAccessToken,
  adminAuth,
  async (request, response) => {
    const { imageUrl, title, price, percentageOff, rating = 3 } = request.body;

    await ProductModal.create({
      image_url: imageUrl,
      title,
      price,
      percentage_off: percentageOff,
      rating,
    });

    response.send("Product Added");
  }
);

// delete Product API
app.delete(
  "/products/:productId",
  authenticateAccessToken,
  adminAuth,
  async (request, response) => {
    const { productId } = request.params;
    // console.log(request);

    await ProductModal.deleteOne({
      _id: productId,
    });

    response.send("Product deleted");
  }
);

// Get Admin Orders API
app.get(
  "/admin-orders",
  authenticateAccessToken,
  adminAuth,
  async (request, response) => {
    // get  users orders
    const orders = await OrderModal.find();
    // get user details
    const user_ids = orders.map((each) => each.user_id);
    const users = await UserModal.find({
      _id: {
        $in: user_ids,
      },
    });

    // based on user orders product id get products details
    const product_ids = orders.map((each) => each.product_id);
    const products = await ProductModal.find({
      product_id: {
        $in: product_ids,
      },
    });

    const mergedProductsAndOrder = orders.map((each) => {
      const index = products.findIndex((prod) => prod._id == each.product_id);
      const product = products[index];

      const user = users.find((user) => user._id == each.user_id);
      // const user = users[userIndex];

      return {
        order_id: each._id,
        timestamp: each.timestamp,
        quantity: each.quantity,
        is_delivered: each.is_delivered,
        product_id: each.product_id,
        user_id: each.user_id,
        title: product.title,
        price: product.price,
        rating: product.rating,
        image_url: product.image_url,
        percentage_off: product.percentage_off,
        name: user.name,
        email: user.email,
      };
    });

    // sending to them
    response.send(mergedProductsAndOrder);
  }
);

// Get Admin Orders API
app.put(
  "/admin-orders/:orderId",
  authenticateAccessToken,
  adminAuth,
  async (request, response) => {
    const { orderId } = request.params;
    const { isDelivered } = request.body;

    await OrderModal.updateOne(
      { _id: orderId },
      { $set: { is_delivered: isDelivered } }
    );

    // sending to them
    response.send("Delivery status updated");
  }
);

// Get Admin transactions
app.get(
  "/admin-transactions",
  authenticateAccessToken,
  adminAuth,
  async (request, response) => {
    // get transactions

    const transactions = await TransactionModal.find();
    // send transactions
    response.send(transactions);
  }
);

// Update admin transactions
app.put(
  "/admin-transactions/:transactionId",
  authenticateAccessToken,
  adminAuth,
  async (request, response) => {
    const { transactionId } = request.params;
    const { status } = request.query;

    await TransactionModal.updateOne(
      { _id: transactionId },
      {
        $set: {
          transaction_status: status,
        },
      }
    );
    // send transactions
    response.send("Transaction status Updated");
  }
);
