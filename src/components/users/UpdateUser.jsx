import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getItemData } from "../../mockService/service";

function UpdateUser() {
  const { id } = useParams();

  async function getUserData() {
    const data = await getItemData("../../mockData/users_data.json", id);
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <h2>modify user</h2>
      <p>{id}</p>
    </div>
  );
}

export default UpdateUser;
