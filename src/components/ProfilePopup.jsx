import React, { forwardRef, useEffect, useState } from "react";

const ProfilePopup = forwardRef(({ position }, ref) => {
  const [popupPositionY, setPopupPositionY] = useState(0);
  const [popupPositionX, setPopupPositionX] = useState(0);

  useEffect(() => {
    if (ref.current) {
      let availableSpace = window.innerHeight - position.y;
      let menuHeight = ref.current.getBoundingClientRect().height;
      let menuWidth = ref.current.getBoundingClientRect().width;

      //Adjust Y
      if (availableSpace < menuHeight) {
        setPopupPositionY(availableSpace - menuHeight + position.y);
      } else {
        setPopupPositionY(position.y);
      }

      //Adjust X
      if (position.x + menuWidth > window.innerWidth) {
        setPopupPositionX(position.x - menuWidth);
      } else {
        setPopupPositionX(position.x);
      }
    }
  }, [ref]);

  if (ref)
    return (
      <div
        ref={ref}
        style={{ top: `${popupPositionY}px`, left: `${popupPositionX}px` }}
        className="absolute bg-zinc-800 p-4 text-white z-50 max-w-xs rounded-md"
      >
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-24 h-24 bg-black rounded-full object-cover"
        />
        <div className="bg-zinc-900 rounded-md p-4 mt-6">
          <p className="font-bold">Namey McName</p>
          <hr className="mt-2" />
          <p className="mt-2 font-medium">About Me</p>
          <p>
            "Hey, you two robbers! You're under arrest! Ah, just kidding, happy
            Halloween!"
          </p>
          <hr className="mt-2" />
          <p className="mt-2">Member since</p>
          <p>Dec 10, 2022</p>
          <input
            type="text"
            name="message"
            placeholder="Message @Namey McName"
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

