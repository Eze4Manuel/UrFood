import Dashboard from "./dashboard";
import config from '../assets/utils/config';
import Navbar from "../components/navigation/Navbar";

// Access 1 - super admin, 2 - admin staff & support
const pages = config.pages;
export const routes = [
    {link: pages.dashboard, Component: Dashboard, access: 1, NavigationBar: Navbar},
]