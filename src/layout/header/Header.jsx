import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";

import { logout } from "/src/redux/slices/auth";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  const handleSignOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((message) => {
        console.log(message);
      });
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src="/src/assets/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {isLoggedIn ? (
        <div>
          <Link to="/profile" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {profile?.firstName}
          </Link>
          <Link to="/" className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
