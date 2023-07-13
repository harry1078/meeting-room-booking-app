import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { AuthProvider } from "./contexts/AuthContext";
import { Dashboard } from "./components/pages/Dashboard";
import { Bookings } from "./components/pages/Bookings";
import { Rooms } from "./components/pages/Rooms";
import { Sidebar } from "./components/Sidebar";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { Users } from "./components/pages/Users";
import { AddBookings } from "./components/pages/Bookings/AddBookings";
import "./App.css";
import { EditBookings } from "./components/pages/Bookings/EditBookings";
import { AddRoom } from "./components/pages/Rooms/AddRoom";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/side" element={<Sidebar />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/addbookings" element={<AddBookings />} />
            <Route path="/editbookings/:id" element={<EditBookings />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/addrooms" element={<AddRoom />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
