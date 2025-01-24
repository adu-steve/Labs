// src/App.tsx
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Invoices from "./components/invoices/Invoices";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import NotFound from "./components/not-found/NotFound";
import Headline from "./components/ui/typography/headline/Headline";
import Text from "./components/ui/typography/text/Text";
import ViewInvoice from "./components/view-invoice/ViewInvoice";
import { useEffect } from "react";
import { fetchInvoices } from "./features/invoice/invoice.slice";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";
import { toggleMobile } from "./features/mobile/mobile.slice";
import { Toaster } from "sonner";
import LoginPage from "./components/login/LoginPage";
import UnauthorizedPage from "./components/unauthorized/UnauthorizedPage";
import { selectAuth } from "./features/auth/auth.slice";

function App() {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(selectAuth);

  useEffect(() => {
    if (token) {
      dispatch(fetchInvoices());
    }
  }, [dispatch, token]);

  useEffect(() => {
    window.addEventListener("resize", () => dispatch(toggleMobile()));

    return () => {
      window.removeEventListener("resize", () => dispatch(toggleMobile()));
    };
  }, [dispatch]);


  return (
    <div className={"app"}>
      <Toaster theme="system" richColors position={"top-right"} />
      {token && <Sidebar />}
      <div className={"content"}>
        <Routes>
          <Route
            path="/"
            element={token ? <Invoices /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route
            path="/:id"
            element={token ? <ViewInvoice /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={
              <NotFound>
                <Headline variant={"h3"}>Page cannot be found</Headline>
                <Text>
                  Click the <br />
                  <strong>Home</strong> button👇
                </Text>
                <Link to={"/"}>Home</Link>
              </NotFound>
            }
          />
        </Routes>
      </div>
     
    </div>
  );
}

export default App;
