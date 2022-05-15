import * as React from "react";
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
          <Room />
        </div>
      </section>
    );
  }
}

export default MeetPage;
