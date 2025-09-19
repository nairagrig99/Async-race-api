import {NavLink} from "react-router-dom";

export default function Menu() {
    return <nav>
        <ul className="flex gap-5 mb-10 border-b border-solid pb-[30px]">
            <li>
                <NavLink
                    to="/garage"
                    className={({isActive}) =>
                        `menu-btn ${
                            isActive ? 'bg-yellow-500 text-white' : ""
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
                                 isActive ? 'bg-yellow-500 text-white' : ""
                             }`
                         }
                >
                    Winners
                </NavLink>
            </li>
        </ul>
    </nav>
}