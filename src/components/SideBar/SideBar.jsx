import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
    const username = "Terrence Tegegne";

    return (
        <aside className="sidebar">
            <div className="sidebar__profile">
                <div className="sidebar__user-name">{username}</div>
                <img className="sidebar__avatar" src={avatar} alt={username} />
            </div>
        </aside>
    );
}