import React, { useState } from "react";
import '../styles/CreateChannelModal.css'

function CreateChannelModal({ channelModalRef, closeChannelModal }) {

  return (
    <dialog ref={channelModalRef} >
      <div id="channel-modal">
        <label id="channel-modal-input-label" htmlFor="">Channel Name</label>
        <input id="channel-modal-input" type="text" placeholder="Enter channel name here" />
        <div id="channel-modal-buttons">
          <button id="channel-modal-cancel" onClick={() => closeChannelModal()}>Cancel</button>
          <button id="channel-modal-create">Create Channel</button>
        </div>

      </div>
    </dialog>
  );
}

export default CreateChannelModal;
