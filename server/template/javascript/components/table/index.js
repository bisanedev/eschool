import Table from './table';
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import DataSimple from "./data_simple";
import DataProfile from "./data_profile";
import Pagination from "./pagination";
import Loading from "./loading";
import Empty from "./empty";

export default Object.assign(Table, {
    Header,
    Body,
    DataSimple,
    DataProfile,
    Pagination,
    Footer,
    Loading,
    Empty
});