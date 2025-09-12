import {NavLink} from "react-router-dom";

export default function Menu() {
    return <nav>
        <ul className="flex gap-5 mb-20">
            <li>
                <NavLink
                    to="/garage"
                    className={({isActive}) =>
                        `menu-btn ${
                            isActive ? 'bg-green-500 text-white' : ""
                        }`
                    }
                >
                    Garage
                </NavLink>
            </li>
            <li>
                <NavLink to="/winners"
                         className={({isActive}) =>
                             `menu-btn ${
                                 isActive ? 'bg-green-500 text-white' : ""
                             }`
                         }
                >
                    Winners
                </NavLink>
            </li>
        </ul>
    </nav>
}