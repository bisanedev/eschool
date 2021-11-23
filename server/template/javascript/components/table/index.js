import Table from './table';
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import DataSimple from "./data_simple";
import DataProfile from "./data_profile";
import DataSoal from "./data_soal";
import Pagination from "./pagination";
import Loading from "./loading";
import Empty from "./empty";

export default Object.assign(Table, {
    Header,
    Body,
    DataSimple,
    DataProfile,
    DataSoal,
    Pagination,
    Footer,
    Loading,
    Empty
});