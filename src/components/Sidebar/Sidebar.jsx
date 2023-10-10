import { useContext } from "react";
import style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext.jsx";
import { showAddModal } from "../../utils/Note.js";
import { NoteContext } from "../../Context/NoteContext.jsx";

export default function Sidebar({ minimized, minimizedFun }) {
  const { logOut, token } = useContext(UserContext);
  const { setNotes } = useContext(NoteContext);
  return (
    <>
      <nav className={`${style.nav} shadow-sm`}>
        <button
          className="btn btn-main text-capitalize w-100 mb-3"
          onClick={() => showAddModal({ updater: setNotes, token })}
        >
          <i className="fa-solid fa-plus me-2"></i>
          {minimized ? "" : " New Note"}
        </button>
        <ul className="list-unstyled">
          <li>
            <NavLink to="/">
              <i className="bi bi-house-heart me-2"></i>
              {minimized ? "" : " Home"}
            </NavLink>
          </li>

          <li onClick={logOut}>
            <span className="pointer">
              <i className="bi bi-box-arrow-left me-2"></i>
              {minimized ? "" : " Log Out"}
            </span>
          </li>
          <li></li>
        </ul>
        <div
          className={`${style.change} shadow pointer`}
          onClick={() => {
            minimizedFun(!minimized);
          }}
        >
          <i
            className={`fa-solid ${
              minimized ? `fa-chevron-right` : `fa-chevron-left`
            } `}
          ></i>
        </div>
      </nav>
    </>
  );
}
