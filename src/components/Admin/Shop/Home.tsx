import LayoutAdmin from "@/container/admin/LayoutAdmin";
import MyTable from "@/components/Admin/Table/MyTable";
import MyTab from "@/components/Admin/Tab/MyTab";
import {tabs, tabsShop} from "@/config/constant";
const Home = () => {
    return (
        <LayoutAdmin>
                <MyTab tabs={tabs}/>
                <MyTable />
        </LayoutAdmin>
    )
}
export default Home;