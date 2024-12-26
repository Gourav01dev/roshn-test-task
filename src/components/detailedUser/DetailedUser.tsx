import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useParams } from "react-router-dom";
import { fetchUserDetailPage } from "../../utils/apiService";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Link } from "react-router-dom";
import { Avatar, Flex } from "@radix-ui/themes";
import { IoMdArrowBack } from "react-icons/io";
const DetailedUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(fetchUserDetailPage(id));
    }
  }, [dispatch]);

  const { detailedUser, loading } = useSelector(
    (state: RootState) => state.user
  );
  console.log(detailedUser);

  return (
    <div>
      {loading == true ? (
        <h3 style={{ textAlign: "center", font: "bold" }}>
          Loading Detail page ...
        </h3>
      ) : (
        <div className="detailuser">
          <Link to={"/"}>
            <IoMdArrowBack className="back-icon" />
          </Link>
          <div className="avatar">
            <h1 className="title">User Detail Page</h1>
            <Flex gap="2">
              <Avatar
                radius="full"
                size="3"
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback={`${detailedUser[0].name.charAt(0)}`}
              />
            </Flex>
          </div>

          <div className="user-details">
            <div className="detail-item"> 
              <strong>ID:</strong> <span>{detailedUser[0]?.id}</span>
            </div>
            <div className="detail-item">
              <strong>Username:</strong> <span>{detailedUser[0]?.username}</span>
            </div>
            <div className="detail-item">
              <strong>Name:</strong> <span>{detailedUser[0]?.name}</span>
            </div>
            <div className="detail-item">
              <strong>Email:</strong> <span>{detailedUser[0]?.email}</span>
            </div>
            <div className="detail-item">
              <strong>Phone:</strong> <span>{detailedUser[0]?.phone}</span>
            </div>
            <div className="detail-item">
              <strong>City:</strong> <span>{detailedUser[0]?.address.city}</span>
            </div>
            <div className="detail-item">
              <strong>Street:</strong>{" "}
              <span>{detailedUser[0]?.address?.street}</span>
            </div>
            <div className="detail-item">
              <strong>ZipCode:</strong>{" "}
              <span>{detailedUser[0]?.address?.zipcode}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedUser;
