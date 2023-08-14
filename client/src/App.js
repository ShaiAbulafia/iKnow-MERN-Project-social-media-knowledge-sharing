import "./App.css";
import Layout from "./layout/Layout";
import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "./providers/SnackbarProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import { UserProvider } from "./users/providers/UserProvider";
import { CartProvider } from "./carts/providers/CartProvider";
import { NotificationsMenuProvider } from "./notifications/providers/NotificationsMenuProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider>
            <UserProvider>
              <NotificationsMenuProvider>
                <CartProvider>
                  <Layout>
                    <Router />
                  </Layout>
                </CartProvider>
              </NotificationsMenuProvider>
            </UserProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
