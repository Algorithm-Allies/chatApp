import React, { useContext, forwardRef, useEffect, useState } from "react";
import { ChatContext } from "../context/Context";

const ProfilePopup = forwardRef(({ position, elementClicked }, ref) => {
  const [popupPositionY, setPopupPositionY] = useState(0);
  const [popupPositionX, setPopupPositionX] = useState(0);
  const [profile, setProfile] = useState(null); // State to store the fetched profile
  const [loading, setLoading] = useState(true); // Loading state

  const { fetchProfile } = useContext(ChatContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await fetchProfile(elementClicked);
        setProfile(userProfile);
        console.log("Sender ID: " + elementClicked);
        console.log("profile set to: " + userProfile); // Use userProfile directly
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    // Capture the values at the time of initiating the fetch
    const currentRef = ref.current;
    const currentPosition = position;

    fetchUserProfile();

    if (currentRef) {
      let availableSpace = window.innerHeight - currentPosition.y;
      let menuHeight = currentRef.getBoundingClientRect().height;
      let menuWidth = currentRef.getBoundingClientRect().width;

      // Adjust Y
      if (availableSpace < menuHeight) {
        setPopupPositionY(availableSpace - menuHeight + currentPosition.y);
      } else {
        setPopupPositionY(currentPosition.y);
      }

      // Adjust X
      if (currentPosition.x + menuWidth > window.innerWidth) {
        setPopupPositionX(currentPosition.x - menuWidth);
      } else {
        setPopupPositionX(currentPosition.x);
      }
    }
  }, [ref, elementClicked, fetchProfile, position]);

  if (!profile || loading) {
    return null; // Return null during loading or if there's an error fetching the profile
  }

  return (
    <div
      ref={ref}
      style={{ top: `${popupPositionY}px`, left: `${popupPositionX}px` }}
      className="absolute bg-zinc-800 p-4 text-white z-50 max-w-xs rounded-md"
    >
      <img
        src={
          profile.profilePhoto ||
          "https://www.w3schools.com/howto/img_avatar.png"
        }
        alt=""
        className="w-24 h-24 bg-black rounded-full object-cover"
      />
      <div className="bg-zinc-900 rounded-md p-4 mt-6">
        <p className="font-bold">{`${profile.firstName} ${profile.lastName}`}</p>
        <hr className="mt-2" />
        <p className="mt-2 font-medium">About Me</p>
        <p>{profile.aboutMe}</p>
        <hr className="mt-2" />
        <p className="mt-2">Member since</p>
        <p>{profile.memberSince}</p>
        <input
          type="text"
          name="message"
          placeholder={`Message @${elementClicked}`}
          className="p-2 mt-8 bg-transparent border w-full rounded-md"
        />
        <button className="bg-white text-black p-2 mt-4 font-medium rounded-md">
          View Profile
        </button>
      </div>
    </div>
  );
});

export default ProfilePopup;
