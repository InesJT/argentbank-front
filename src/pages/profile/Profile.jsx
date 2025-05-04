import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProfile } from "/src/redux/slices/profile";
import EditForm from "../../components/EditForm";

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile({ token }))
        .unwrap()
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [dispatch, token]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {loading ? "loading..." : `${profile?.firstName} ${profile?.lastName}`}
        </h1>
        {isEditing ? (
          <EditForm
            first={profile?.firstName}
            last={profile?.lastName}
            handleCancel={() => setIsEditing(false)}
          />
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;
