import React from "react";
import Data from "../Data/Data.json";
function DirectMessages({ handleSelect }) {
  return (
    <div className="text-white">
      {Data.users.map((user) => {
        return (
          <div
            key={user.id}
            className="text-white hover:bg-gray-800 cursor-pointer flex items-center p-1"
            onClick={() => handleSelect(user)}
          >
            <img
              src={user.profile_pic}
              alt={`${user.first_name} ${user.last_name}`}
              className="h-6 w-6 rounded-full mr-2"
            />
            <span>
              {user.first_name} {user.last_name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default DirectMessages;
