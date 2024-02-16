import React, { forwardRef, useEffect, useState } from "react";
import axios from "axios";

const ProfilePopup = forwardRef(({ position, userId }, ref) => {
  console.log(userId);
  const [popupPositionY, setPopupPositionY] = useState(0);
  const [popupPositionX, setPopupPositionX] = useState(0);
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3500/api/users/"+userId, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    if (ref && ref.current) {
      let availableSpace = window.innerHeight - position.y;
      let menuHeight = ref.current.getBoundingClientRect().height;
      let menuWidth = ref.current.getBoundingClientRect().width;

      // Adjust Y
      if (availableSpace < menuHeight) {
        setPopupPositionY(availableSpace - menuHeight + position.y);
      } else {
        setPopupPositionY(position.y);
      }

      // Adjust X
      if (position.x + menuWidth > window.innerWidth) {
        setPopupPositionX(position.x - menuWidth);
      } else {
        setPopupPositionX(position.x);
      }
    }
  }, [ref, userId, position]);

  if (!userData) {
    return null; // or some loading state indicator
  }

  return (
    <div
      ref={ref}
      style={{ top: `${popupPositionY}px`, left: `${popupPositionX}px` }}
      className="absolute bg-zinc-800 p-4 text-white z-50 max-w-xs rounded-md"
    >
      <img
        src={userData.profilePhoto || "default-profile-image.jpg"} // Use the actual field from your user data
        alt=""
        className="w-24 h-24 bg-black rounded-full object-cover"
      />
      <div className="bg-zinc-900 rounded-md p-4 mt-6">
        <p className="font-bold">
          {userData.firstName} {userData.lastName}
        </p>
        <hr className="mt-2" />
        <p className="mt-2 font-medium">About Me</p>
        <p>{userData.aboutMe || "No information available"}</p>
        <hr className="mt-2" />
        <p className="mt-2">Member since</p>
        <p>
          {new Date(userData.createdAt).toLocaleDateString() || "Unknown"}
        </p>

      </div>
    </div>
  );
});

export default ProfilePopup;
