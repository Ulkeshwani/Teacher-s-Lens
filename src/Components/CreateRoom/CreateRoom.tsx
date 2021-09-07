import React from "react"
import { v1 as uuidv1 } from "uuid"

const CreateRoom: React.FC = (props: any) => {
    function _handleUuid() {
        const id: any = uuidv1();
        props.history.replace(`/room/${id}`);
    }
    return (
        <button type="button" onClick={_handleUuid}>Create Room</button>
    );
};

export default CreateRoom;