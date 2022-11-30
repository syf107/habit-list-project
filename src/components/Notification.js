import React, { useEffect } from "react";

function Notification({ message, type, showNotification, list }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showNotification();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);

  return (
    <section
      className={`sticky top-2 rounded-md text-center px3 py-2 w-9/12 mx-auto text-xl text-gray-200 ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      <h4>{message}</h4>
    </section>
  );
}

export default Notification;
