import config from '../assets/utils/config';
import Dashboard from "./dashboard";
import Settings from "./settings/Setting";
import Vendor from './user/vendor/Vendor';
import Support from './user/support/index';
import Dispatcher from './user/dispatcher/index';
import Customer from './user/customers/Customer';
import Navbar from "../components/navigation/Navbar";
import Transaction from "./transaction/Transaction";
import Order from './services/Order/Order';
import Food from './services/Food/Food';
import Listing from './services/Listing';
import SupportStaff from './services/support/Support';
import Location from '../pages/location/index';
import Pricing from "./pricing/index";

// Access 1 - super admin, 2 - admin staff & support
const pages = config.pages;

export const routes = [
    {link: pages.dashboard, Component: Dashboard, access: 1, NavigationBar: Navbar},
    {link: pages.settings, Component: Settings, access: 2, NavigationBar: Navbar},
    {link: pages.support, Component: Support, access: 2, NavigationBar: Navbar},
    {link: pages.vendor, Component: Vendor, access: 2, NavigationBar: Navbar},
    {link: pages.customers, Component: Customer, access: 2, NavigationBar: Navbar},
    {link: pages.dispatch, Component: Dispatcher, access: 2, NavigationBar: Navbar},
    {link: pages.transaction, Component: Transaction, access: 2, NavigationBar: Navbar},
    {link: pages.listing, Component: Listing, access: 2, NavigationBar: Navbar},
    {link: pages.order, Component: Order, access: 2, NavigationBar: Navbar},
    {link: pages.food, Component: Food, access: 2, NavigationBar: Navbar},
    {link: pages.supportstaff, Component: SupportStaff, access: 2, NavigationBar: Navbar},
    {link: pages.location, Component: Location, access: 2, NavigationBar: Navbar},
    {link: pages.pricing, Component: Pricing, access: 2, NavigationBar: Navbar}
]