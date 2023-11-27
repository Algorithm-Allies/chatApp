import React, { useState } from 'react'

const ProfilePopup = ({position, name}) => {

  return (
    <div style={{top: `${position.y}px`, left: `${position.x + 20}px`}} className='absolute bg-gray-800 text-white p-4 z-50'>
        <p className='text-2xl'>{name}</p>
        <button className='bg-white text-black p-2 mt-4 font-medium'>View Profile</button>
    </div>
  )
}

export default ProfilePopup