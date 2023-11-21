import React, { useState } from "react";

function CreateChannelModal({showCreateChannelModal, setShowCreateChannelModal}) {

  return (
    showCreateChannelModal
    ?
    <div>
      <p>Hello I'm a modal.</p>
      <button onClick={() => setShowCreateChannelModal(false)}>Cancel</button>
    </div>
    :
    null
  );
}

export default CreateChannelModal;
