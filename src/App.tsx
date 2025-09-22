import './App.css'
import {Outlet} from "react-router-dom";
import Menu from "./components/shared/Menu/Menu.tsx";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "./store/store.ts";
import {useEffect} from "react";
import {getCars} from "./services/GarageService.ts";

function App() {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getCars())
    }, [dispatch])

    return <div className="p-10">
        <Menu/>
        <Outlet/>
    </div>
}

export default App
