import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <div className="m-5 mx-[25%] flex content-center justify-center">
      <NavLink to="/" className="text-5xl font-bold mr-auto content-center">
        Habit Tracker
      </NavLink>
      <div className="self-center">
        <NavLink to="/stats" className="text-3xl">
          Stats
        </NavLink>
      </div>
    </div>
  );
}
