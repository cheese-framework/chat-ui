import { FC, useCallback, useEffect, useState } from "react";
import styles from "@/styles/Modal.module.css";
import { Room, User } from "@/types";
import LoadingDots from "./Loader";
import { capitalizeFirstLetter, showErrorMessage } from "@/utils";
import axios from "axios";
import { API_URL } from "@/config";

type Props = {
  closeModal: Function;
  userData: User;
  rooms: Room[];
  setRooms: Function;
};

const UsersModal: FC<Props> = ({ closeModal, userData, rooms, setRooms }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${API_URL}/users?except=${userData._id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      setUsers(data);
    } catch (err) {
      showErrorMessage(err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <>
      <div className="backdrop" onClick={() => closeModal()}></div>
      <div
        className={styles.container}
        style={{ width: "30%", padding: "20px" }}
      >
        {loading ? (
          <LoadingDots />
        ) : (
          <>
            <div className={styles.heading}>
              <div className={styles.heading_text}>
                <h1>Select a user to chat with</h1>
                <p></p>
              </div>
              <i
                className="fas fa-close"
                onClick={() => closeModal()}
                role="button"
              ></i>
            </div>
            <div className={styles.body}>
              <ul>
                {users.map((user, index) => (
                  <li key={user._id}>
                    <p>
                      <strong>{capitalizeFirstLetter(user.username)}</strong>
                    </p>
                    <p>
                      <em>{user.email}</em>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UsersModal;
