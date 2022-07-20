import AdminOrderItem from "../AdminOrderItem";
import Axios from "../../axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { useState, useEffect } from "react";

function AdminOrders() {
  const naviagate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const jwtToken = Cookies.get("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const response = await Axios.get("/feed", config);

      if (response.statusText === "OK") {
        const convertedData = response.data.map((each) => ({
          id: each._id,
          title: each.title,
          rating: each.rating,
          price: each.price,
          percentageOff: each.percentage_off,
          imageUrl: each.image_url,
        }));

        convertedData.reverse();
        setProducts(convertedData);
      }
    };
    fetchFeed();
  });

  const onClickAddItemButton = () => {
    naviagate("/admin-form-create");
  };

  return (
    <div className="admin-orders">
      <div className="add_ItemsSection">
        <button type="button" onClick={onClickAddItemButton}>
          add Item
        </button>
      </div>

      <div>
        {products.map((each) => (
          <AdminOrderItem key={each.id} productData={each} />
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;
