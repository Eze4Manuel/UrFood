import config from '../assets/utils/config';
import Dashboard from "./dashboard";
import Settings from "./settings/Setting";
import Vendor from './user/vendor/Vendor';
import Support from './user/support/index';
import Dispatcher from './user/dispatcher/index';
import Navbar from "../components/navigation/Navbar";

// Access 1 - super admin, 2 - admin staff & support
const pages = config.pages;
export const routes = [
    {link: pages.dashboard, Component: Dashboard, access: 1, NavigationBar: Navbar},
    {link: pages.settings, Component: Settings, access: 2, NavigationBar: Navbar},
    {link: pages.support, Component: Support, access: 2, NavigationBar: Navbar},
    {link: pages.vendor, Component: Vendor, access: 2, NavigationBar: Navbar},
    {link: pages.dispatch, Component: Dispatcher, access: 2, NavigationBar: Navbar}
]