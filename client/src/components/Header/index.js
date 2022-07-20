import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./index.css";

import AppContext from "../../context/AppContext";

function Header() {
  const navigate = useNavigate();

  return (
    <AppContext.Consumer>
      {(value) => {
        const { cartList } = value;

        const getAdminPage = () => {
          const userDetails = Cookies.get("userDetails");
          const parsedUserDetails = JSON.parse(userDetails);
          const isAdmin = parsedUserDetails.isAdmin;

          const amdinContent = isAdmin ? (
            <Link className="link-item" to="/admin">
              <p className="header__rightSectionLink">Admin</p>
            </Link>
          ) : null;

          return amdinContent;
        };

        const getUserDetails = () => {
          const userDetails = Cookies.get("userDetails");
          const parsedUserDetails = JSON.parse(userDetails);
          const name = parsedUserDetails.name;

          return (
            <p className="header__rightSectionLink">
              <small>Hello,</small>
              <br />
              {name}
            </p>
          );
        };

        const onClickLogoutButton = () => {
          Cookies.remove("jwtToken");
          Cookies.remove("userDetails");
          navigate("/login");
        };

        return (
          <div className="header">
            <div className="header__LogoAndSearchInputs">
              <Link className="link-item" to="/">
                <img
                  className="header__logoImage"
                  alt="amazon logo"
                  src="https://i0.wp.com/zeevector.com/wp-content/uploads/LOGO/Amazon-India-Logo-PNG-White2.png?fit=561%2C160&ssl=1"
                />
              </Link>

              <div className="header__search">
                <form>
                  <input type="input" placeholder="Search Amazon.in" />
                  <button type="button">
                    <FiSearch size={20} />
                  </button>
                </form>
              </div>
            </div>

            <div className="header_rightSection">
              <Link className="link-item" to="/cart">
                <p className="header__rightSectionLink">
                  Cart{" "}
                  {cartList.length ? (
                    <sup className="cart_Badge">{cartList.length}</sup>
                  ) : null}
                </p>
              </Link>

              <Link className="link-item" to="/payments">
                <p className="header__rightSectionLink">Payments</p>
              </Link>

              <Link className="link-item" to="/orders">
                <p className="header__rightSectionLink">Orders</p>
              </Link>

              <Link className="link-item" to="/transactions">
                <p className="header__rightSectionLink">Transactions</p>
              </Link>

              {getAdminPage()}

              {getUserDetails()}

              <p
                className="header__rightSectionLink"
                onClick={onClickLogoutButton}
              >
                Log out
              </p>
            </div>
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Header;
