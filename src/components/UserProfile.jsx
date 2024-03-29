import React, { useState, useContext, useEffect } from "react";
import { ChatContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading/Loading";

const UserProfile = () => {
  const { isLoading, fetchProfile, saveNewProfile, setSelectedChannel } =
    useContext(ChatContext);

  const [userInfo, setUserInfo] = useState({
    displayName: "",
    pronouns: "",
    aboutMe: "",
    primaryColor: "",
    accentColor: "",
    profilePic: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchProfile()
      .then((data) => {
        setUserInfo({
          displayName: data.username,
          pronouns: data.pronouns,
          aboutMe: data.aboutMe,
          primaryColor: data.primaryColor,
          accentColor: data.accentColor,
          profilePic: data.profilePhoto,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setUserInfo]);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  const handleFileChange = async (e) => {
    const pic = e.target.files[0];
    if (!pic || (pic.type !== "image/jpeg" && pic.type !== "image/png")) {
      alert("Error with the profile photo");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "dddnteeyw");

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dddnteeyw/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();

      console.log(
        "Cloudinary upload successful:",
        cloudinaryData.url.toString()
      );
      setIsChanged(true);
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        profilePic: cloudinaryData.url.toString(),
      }));
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  };

  const handleSave = async () => {
    try {
      const obj = {
        newUsername: userInfo.displayName,
        newPronouns: userInfo.pronouns,
        newAboutMe: userInfo.aboutMe,
        newPrimaryColor: userInfo.primaryColor,
        newAccentColor: userInfo.accentColor,
        newProfilePic: userInfo.profilePic,
      };
      await saveNewProfile(obj);
      setIsChanged(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleEscPress = () => {
    navigate("/chat-page");
  };
  if (isLoading) {
    return <Loading />; // or render a loading spinner, etc.
  }
  return (
    <div className="bg-profile-color	p-4 flex text-gray-700 justify-center items-start min-h-screen flex-wrap">
      <div className="w-full md:w-auto md:mr-8 mb-8 md:mb-0">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <label className="text-gray-200">Display Name</label>
            <input
              className="mt-1 p-3 rounded-md"
              type="text"
              name="displayName"
              placeholder="Enter username"
              value={userInfo.displayName}
              onChange={handleChange}
            />
          </div>
          <hr className="my-6" />
          <div className="flex flex-col">
            <label className="text-gray-200">Pronouns</label>
            <input
              className="mt-1 p-3 rounded-md"
              type="text"
              name="pronouns"
              placeholder="he/him"
              value={userInfo.pronouns}
              onChange={handleChange}
            />
          </div>
          <hr className="my-6" />
          <div className="flex flex-col items-start">
            <p>Avatar</p>
            <div className="mt-2">
              <label
                htmlFor="profile-avatar"
                className="rounded-md text-gray-200 bg-blue-600 px-4 py-2 hover:cursor-pointer hover:bg-blue-700"
              >
                Change Avatar
              </label>
              <input
                id="profile-avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
          <hr className="my-6" />
          <div>
            <label className="text-gray-200">Profile Theme</label>
            <div className="flex mt-2">
              <div className="flex flex-col items-center">
                <label
                  style={{ backgroundColor: userInfo.primaryColor }}
                  className="rounded-md h-16 w-20 hover:cursor-pointer"
                  htmlFor="profile-primary"
                ></label>
                <input
                  id="profile-primary"
                  className="hidden"
                  type="color"
                  name="primaryColor"
                  value={userInfo.primaryColor}
                  onChange={handleChange}
                />
                <p>Primary</p>
              </div>
              <div className="flex flex-col items-center ml-6">
                <label
                  style={{ backgroundColor: userInfo.accentColor }}
                  className="rounded-md h-16 w-20 hover:cursor-pointer"
                  htmlFor="profile-accent"
                ></label>
                <input
                  id="profile-accent"
                  className="hidden"
                  type="color"
                  name="accentColor"
                  value={userInfo.accentColor}
                  onChange={handleChange}
                />
                <p>Accent</p>
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <div className="flex flex-col">
            <label className="text-gray-200">About Me</label>
            <textarea
              className="rounded-md mt-2 p-4"
              name="aboutMe"
              id=""
              cols="40"
              rows="8"
              value={userInfo.aboutMe}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
      </div>
      <div>
        <div className="w-full md:w-auto">
          <p>Preview</p>
          <div
            className="rounded-md border-2 border-white mt-1 max-w-sm"
            style={{
              backgroundColor: userInfo.primaryColor,
              minWidth: "24rem",
            }}
          >
            <div className="rounded-t-sm bg-cover bg-no-repeat"></div>
            <div className="rounded-md bg-white p-4 m-4 text-black flex flex-col ">
              <img
                className="rounded-full h-20 w-20 border border-black"
                src={userInfo.profilePic}
                alt=""
              />
              <p className="font-bold mt-2">{userInfo.displayName}</p>
              <p>{userInfo.pronouns}</p>
              <hr className="my-2" />
              <p className="font-bold">About Me</p>
              <p>{userInfo.aboutMe}</p>
              <button
                style={{ backgroundColor: userInfo.accentColor }}
                className="rounded-md py-2 mt-4 font-medium"
              >
                Example Button
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2">
            <button
              className="rounded-md bg-red-500 text-white hover:bg-red-800 px-4 py-2 mt-4"
              onClick={handleEscPress}
            >
              Close
            </button>
            {isChanged && (
              <button
                className="rounded-md bg-blue-green p-4 mt-4 hover:bg-dark-teal text-white"
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
