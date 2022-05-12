import { v1 as uuidv1 } from "uuid";
import { useHistory } from "react-router";

export const CreateRoom = (props) => {
  const history = useHistory();
  const id = uuidv1();
  return history.replace(`/Meet/${id}`);
};
