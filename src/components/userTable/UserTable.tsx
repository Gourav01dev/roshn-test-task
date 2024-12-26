import { Table } from "@radix-ui/themes";
import React from "react";
import "@radix-ui/themes/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { tableItemPayload } from "./types/tableInterface";
import { useNavigate } from "react-router-dom";

const UserTable: React.FC = () => {
  const navigate = useNavigate();
  const handleUserId = (id: number) => {
    navigate(`/${id}`);
  };
  const { users, loading } = useSelector(
    (state: RootState) => state.user
  );
  // console.log(users);

  return (
    <div>
      {
        loading ==true ? <h3 style={{textAlign:"center"}}>Loading UserList...</h3> : 
      
      <Table.Root style={{cursor:"pointer"}}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Full name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        {users &&
          users.length > 0 &&
          users.map((item: tableItemPayload, index: number) => {
            return (
              <Table.Body key={index}>
                <Table.Row onClick={() => handleUserId(item.id)}>
                  <Table.RowHeaderCell>{item.username}</Table.RowHeaderCell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
      </Table.Root>
      }
    </div>
  );
};

export default UserTable;
