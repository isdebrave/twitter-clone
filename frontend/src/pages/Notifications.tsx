import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BsTwitterX } from "react-icons/bs";

import MainHeading from "../components/MainHeading";

import useNotifications from "../hooks/useNotifications";

import { RootState } from "../redux/store";
import {
  onNotificationDelete,
  onNotifications,
} from "../redux/reducers/notifications";
import { onMeAlertDelete } from "../redux/reducers/me";

const Notifications = () => {
  const { data, mutate } = useNotifications();

  const notifications = useSelector((state: RootState) => state.notifications);
  const me = useSelector((state: RootState) => state.me);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;

    dispatch(onNotifications(data));

    return () => {
      axios
        .get(`/notification/all?userId=${me.id}`)
        .then((response) => mutate(response.data))
        .catch((error) => {
          console.log(error);

          if (error.response.status === 500) {
            return alert(error.response.data);
          }
        });
    };
  }, [data, dispatch, mutate, me.id]);

  useEffect(() => {
    if (me.hasNotification === true) {
      axios.delete("/user/alert", { data: { userId: me.id } });
      dispatch(onMeAlertDelete());
    }
  }, [me, dispatch]);

  return (
    <>
      <MainHeading title="Notifications" onClick={() => navigate(-1)} />
      <hr />
      {notifications.length === 0 ? (
        <span className="block text-neutral-500 text-center p-6 text-xl">
          알림이 없습니다.
        </span>
      ) : (
        <>
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="
                group 
                hover:bg-slate-100 
                cursor-pointer 
                flex 
                justify-between 
                items-center
                border-b
              "
            >
              <div className="m-3 flex items-center gap-3">
                <BsTwitterX size={25} />
                <p>{notification.body}</p>
              </div>
              <button
                onClick={() => {
                  axios.delete("/notification", {
                    data: { notificationId: notification.id },
                  });
                  dispatch(onNotificationDelete(notification.id));
                }}
                className="
                  invisible
                  mr-3
                  p-1
                  px-2
                  rounded-full
                  group-hover:visible
                  group-hover:bg-rose-500
                  group-hover:text-white
                  hover:brightness-90
                "
              >
                Delete
              </button>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Notifications;
