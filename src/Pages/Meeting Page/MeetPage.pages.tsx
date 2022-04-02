import * as React from "react";
import { ChatNavigation } from "Components/ChatSidebar/Chat.component";
import Room from "Components/Room/Room";

import "./MeetPage.styles.css";

type UserCallProps = {
  roomID?: string;
};

class MeetPage extends React.Component<UserCallProps> {
  state: UserCallProps = {
    roomID: this.props.roomID,
  };
  render() {
    return (
      <section className="Meet_Wrapper">
        <div className="Meet_callContainer">
          <Room roomID={this.state.roomID} />
        </div>
      </section>
    );
  }
}

export default MeetPage;
