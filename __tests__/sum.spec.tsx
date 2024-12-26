//@ts-nocheck
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
// import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../src/store/store"; // assuming this is the path to your store
import UserTable from "../src/components/userTable/UserTable"; // assuming this is the path to your component
import { useNavigate } from "react-router-dom";

const mockStore = createStore(
  (state = { user: { users: [], loading: false } }) => state
);

jest.mock("@radix-ui/themes", () => ({
  Table: {
    Root: ({ children }: any) => <table>{children}</table>, // Mock Table component
    Header: ({ children }: any) => <thead>{children}</thead>, // Mock Table.Header
    Body: ({ children }: any) => <tbody>{children}</tbody>, // Mock Table.Body
    Row: ({ children, onClick }: any) => <tr onClick={onClick}>{children}</tr>, // Mock Table.Row
    ColumnHeaderCell: ({ children }: any) => <th>{children}</th>, // Mock Table.ColumnHeaderCell
    Cell: ({ children }: any) => <td>{children}</td>, // Mock Table.Cell
  },
}));

describe("UserTable", () => {
  test("displays loading message when loading is true", () => {
    // Mock state where loading is true
    const mockState = {
      user: {
        users: [],
        loading: true,
      },
    };

    render(
      <Provider store={{ ...store, getState: () => mockState }}>
        <Router>
          <UserTable />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Loading UserList...")).toBeInTheDocument();
  });

  test("displays user data in the table when loading is false and users are available", () => {
    const mockState = {
      user: {
        users: [
          {
            id: 1,
            username: "user1",
            name: "User One",
            email: "user1@example.com",
            phone: "123456789",
          },
          {
            id: 2,
            username: "user2",
            name: "User Two",
            email: "user2@example.com",
            phone: "987654321",
          },
        ],
        loading: false,
      },
    };

    render(
      <Provider store={{ ...store, getState: () => mockState }}>
        <Router>
          <UserTable />
        </Router>
      </Provider>
    );

    // Ensure table headers are present
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Full name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();

    // Ensure user rows are present
    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("user2")).toBeInTheDocument();
  });

  test("navigates to the user detail page when a row is clicked", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const mockState = {
      user: {
        users: [
          {
            id: 1,
            username: "user1",
            name: "User One",
            email: "user1@example.com",
            phone: "123456789",
          },
        ],
        loading: false,
      },
    };

    render(
      <Provider store={{ ...store, getState: () => mockState }}>
        <Router>
          <UserTable />
        </Router>
      </Provider>
    );

    const row = screen.getByText("user1").closest("tr");
    if (row) {
      fireEvent.click(row);
      await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/1"));
    }
  });

  test("does not render any table data if no users are available", () => {
    const mockState = {
      user: {
        users: [],
        loading: false,
      },
    };

    render(
      <Provider store={{ ...store, getState: () => mockState }}>
        <Router>
          <UserTable />
        </Router>
      </Provider>
    );

    expect(screen.queryByText("Username")).not.toBeInTheDocument();
    expect(screen.queryByText("Full name")).not.toBeInTheDocument();
    expect(screen.queryByText("Email")).not.toBeInTheDocument();
    expect(screen.queryByText("Phone")).not.toBeInTheDocument();
  });
});
