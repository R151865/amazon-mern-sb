import Product from "../Product";
import ReactLoader from "../ReactLoader";
import FailureView from "../FailureView";

import "./index.css";
import { useState, useEffect } from "react";
import Axios from "../../axios";
import { useSpring, animated } from "react-spring";
import Cookies from "js-cookie";

const apiStatusConsts = {
  failure: "FAILURE",
  success: "SUCCESS",
  loading: "LOADING",
  initial: "INITIAL",
};

function Home() {
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial);
  const [openPopup, setOpenPopup] = useState(false);
  const [productsList, setProductsList] = useState([]);

  // fetching products feed api

  const fetchFeed = async () => {
    setApiStatus(apiStatusConsts.loading);
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
        itemImage: each.image_url,
      }));
      setProductsList(convertedData);
      setApiStatus(apiStatusConsts.success);
    } else {
      setApiStatus(apiStatusConsts.failure);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const topList = productsList.slice(0, 2);
  const middleList = productsList.slice(2, 5);
  const remainingList = productsList.slice(5, 12);
  const bottomList = productsList.slice(12, 13);
  const remainingAllList = productsList.slice(13);

  const contentProps = useSpring({
    opacity: openPopup ? 1 : 0,
    marginTop: openPopup ? 0 : 500,
  });

  const getPopup = () => {
    return (
      <animated.div style={contentProps} className="cart_added_popup">
        Addded to cart
      </animated.div>
    );
  };

  const onClickAddedCartButtonShowHidePopup = () => {
    console.log("entering into custom aninamtion");
    setOpenPopup(true);
    const timeOutId = setTimeout(() => {
      setOpenPopup(false);
      clearTimeout(timeOutId);
    }, 1500);
  };

  const renderViewsBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConsts.failure:
        return <FailureView retryAgain={fetchFeed} />;
      case apiStatusConsts.success:
        return getProductsSuccessView();
      case apiStatusConsts.loading:
        return <ReactLoader />;
      default:
        return null;
    }
  };

  const getProductsSuccessView = () => {
    return (
      <>
        <div className="home__row">
          {topList.map((each) => (
            <Product
              key={each.id}
              eachProduct={each}
              onClickAddedCartButtonShowHidePopup={
                onClickAddedCartButtonShowHidePopup
              }
            />
          ))}
        </div>

        <div className="home__row">
          {middleList.map((each) => (
            <Product
              key={each.id}
              eachProduct={each}
              onClickAddedCartButtonShowHidePopup={
                onClickAddedCartButtonShowHidePopup
              }
            />
          ))}
        </div>

        <div className="home__rowMiddle">
          {remainingList.map((each) => (
            <Product
              key={each.id}
              eachProduct={each}
              onClickAddedCartButtonShowHidePopup={
                onClickAddedCartButtonShowHidePopup
              }
            />
          ))}
        </div>

        <div className="home__row">
          {bottomList.map((each) => (
            <Product
              key={each.id}
              eachProduct={each}
              onClickAddedCartButtonShowHidePopup={
                onClickAddedCartButtonShowHidePopup
              }
            />
          ))}
        </div>
        <div className="home__row">
          {remainingAllList.map((each) => (
            <Product
              key={each.id}
              eachProduct={each}
              onClickAddedCartButtonShowHidePopup={
                onClickAddedCartButtonShowHidePopup
              }
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="home">
      <div className="home__body">
        {openPopup && getPopup()}
        <img
          className="home__bodyImage"
          alt="home "
          src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/SingleTitle/Suzhal/3000x1200_Hero-Tall_NP._CB635319275_.jpg"
        />
        {renderViewsBasedOnApiStatus()}
      </div>
    </div>
  );
}

export default Home;
