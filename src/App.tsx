import './App.css'
import {Outlet} from "react-router-dom";
import Menu from "./components/shared/Menu/Menu.tsx";

function App() {
    return <div className="p-10">
        <Menu/>
        <Outlet/>
    </div>
}

export default App
