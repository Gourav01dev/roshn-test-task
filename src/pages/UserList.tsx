import React from "react";
import UserTable from "../components/userTable/UserTable";

const UserList: React.FC = () => {
  return (
    <div data-testid="user-table">
      <h1 style={{ textAlign: "center" }}>User List Data</h1>
      <UserTable />
    </div>
  );
};

export default UserList;



