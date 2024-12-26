import { useDispatch } from "react-redux";
import "./App.css";
import { AppDispatch } from "./store/store";
import { useEffect } from "react";
import { fetchUsers } from "./utils/apiService";
import { BrowserRouter } from "react-router-dom";
import GlobalErrorHandler from "./utils/wrapperComponents/GlobalErrorHandler";
import ErrorBoundary from "./utils/wrapperComponents/ErrorBoundary";
import AppRoutes from "./Routes";
function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <GlobalErrorHandler />
      <ErrorBoundary>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
