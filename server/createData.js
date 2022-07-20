const {
  UserModal,
  ProductModal,
  OrderModal,
  TransactionModal,
} = require("./modal.js");

const createUserData = async () => {
  const data = [
    {
      name: "sulthan",
      email: "sulthan@gmail.com",
      password: "sulthan",
      is_admin: true,
    },
    {
      name: "naresh",
      email: "naresh@gmail.com",
      password: "naresh",
      is_admin: false,
    },
    {
      name: "shaji",
      email: "shaji@gmail.com",
      password: "shaji",
      is_admin: false,
    },
  ];

  const users = await UserModal.insertMany(data);
  console.log("users data created");
};

const createProductData = async () => {
  const data = [
    {
      title:
        "HP Pavilion Gaming Latest AMD Ryzen 5 5600H Processor 15.6 inch(39.6 cm) FHD Gaming Laptop (8GB/512GB SSD/Win 11 Home/NVIDIA GeForce GTX 1650 4GB Graphics/B&O/Backlit KB/MSO/1.98 Kg), 15-ec2150AX",
      price: 60750,
      rating: 4,
      percentage_off: 15,
      image_url: "https://m.media-amazon.com/images/I/51DmOWr3rnL._SY355_.jpg",
    },
    {
      title:
        "boAt Airdopes 121V2 Bluetooth Truly Wireless in Ear Earbuds with Mic with Upto 14 Hours Playback, Lightweight 8Mm Drivers, Led Indicators and Multifunction Controls (Active Black)",
      price: 1999,
      rating: 3,
      percentage_off: 40,
      image_url: "https://m.media-amazon.com/images/I/510+wjzq-vL._SX425_.jpg",
    },
    {
      title:
        "Mentific® Digital Print Lycra Half Sleeve Multi Designs Shirt for Men",
      price: 499,
      rating: 3,
      percentage_off: 30,
      image_url: "https://m.media-amazon.com/images/I/71gvOvQ8k9L._UX679_.jpg",
    },
    {
      title:
        "Redmi Note 11 (Horizon Blue, 4GB RAM, 64GB Storage) | 90Hz FHD+ AMOLED Display | Qualcomm® Snapdragon™ 680-6nm | Alexa Built-in | 33W Charger Included | Get 2 Months of YouTube Premium Free!",
      price: 12999,
      rating: 4,
      percentage_off: 28,
      image_url: "https://m.media-amazon.com/images/I/81zLNgcvlaL._SX425_.jpg",
    },
    {
      title: "ASIAN Men's Oxygen-05 Sports Running Shoes for Men's & Boy's",
      price: 1099,
      rating: 5,
      percentage_off: 45,
      image_url: "https://m.media-amazon.com/images/I/71s7imslkbL._UY500_.jpg",
    },
    {
      title: "ASIAN Men's Oxygen-05 Sports Running Shoes for Men's & Boy's",
      price: 1099,
      rating: 5,
      percentage_off: 45,
      image_url: "https://m.media-amazon.com/images/I/71s7imslkbL._UY500_.jpg",
    },
    {
      title:
        "Jaspo Stealth Heavy Duty Plastic Cricket Bat,Full Size (34” X 4.5”inches) Premium Bat for All Age Groups – Kids/Boys/Girls/Adults",
      price: 426,
      rating: 3,
      percentage_off: 64,
      image_url: "https://m.media-amazon.com/images/I/71ijgbTdf6L._SY450_.jpg",
    },
  ];

  const products = await ProductModal.insertMany(data);
  console.log("Products data created");
};

const createOrderData = async () => {
  const date = new Date();

  const anotherDate = new Date(2022, 1, 1);

  const data = [
    {
      product_id: "62bfe226a5a8b7d028c7b18e",
      user_id: "62bfdd14b4496370ea8abac6",
      timestamp: date,
      quantity: 1,
      is_delivered: false,
    },

    {
      product_id: "62bfe226a5a8b7d028c7b18f",
      user_id: "62bfdd14b4496370ea8abac6",
      timestamp: date,
      quantity: 2,
      is_delivered: true,
    },

    {
      product_id: "62bfe226a5a8b7d028c7b190",
      user_id: "62bfdd14b4496370ea8abac6",
      timestamp: anotherDate,
      quantity: 3,
      is_delivered: true,
    },
  ];

  await OrderModal.insertMany(data);
  console.log("Orders Data inserted");
};

const createTransactionsData = async () => {
  const newData = new Date();

  const data = [
    {
      transaction_date: newData,
      transaction_image_url:
        "https://m.media-amazon.com/images/I/51wJa2YGcJL._AC_SY200_.jpg",
      user_id: "62bfdd14b4496370ea8abac6",
      transaction_status: "PENDING",
      address: "pedaputhedu vi,  dagadarthi m, nellore dt, AP , 55551",
      phone_number: "9877654312",
      order_ids: ["62c2728109d1a8bd05aef242"],
      amount: 5000,
    },
    {
      transaction_date: newData,
      transaction_image_url:
        "https://m.media-amazon.com/images/I/51wJa2YGcJL._AC_SY200_.jpg",
      user_id: "62bfdd14b4496370ea8abac6",
      transaction_status: "DONE",
      address: "pedaputhedu vi,  dagadarthi m, nellore dt, AP , 55551",
      phone_number: "9877654312",
      order_ids: ["62c2728109d1a8bd05aef242"],
      amount: 2000,
    },
    {
      transaction_date: newData,
      transaction_image_url:
        "https://m.media-amazon.com/images/I/51wJa2YGcJL._AC_SY200_.jpg",
      user_id: "62bfdd14b4496370ea8abac6",
      transaction_status: "REJECTED",
      address: "pedaputhedu vi,  dagadarthi m, nellore dt, AP , 55551",
      phone_number: "9877654312",
      order_ids: ["62c2728109d1a8bd05aef242"],
      amount: 1000,
    },
  ];

  await TransactionModal.insertMany(data);
  console.log("Transactions data inserted");
};

const createData = () => {
  // createUserData();
  // createProductData();
  // createOrderData();
  // createTransactionsData();
};

module.exports = createData;
