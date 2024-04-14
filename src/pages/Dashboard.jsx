import DashboardCard from "../components/DashboardCard";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
function Dashboard() {
    return (
        <div>
            <h1 className="text-secondary font-bold text-3xl mb-2">Dashboard</h1>
            {/* <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry>
                    {
                        Array.from({ length: 10 }).map((_, i) => <DashboardCard key={i} />)
                    }
                </Masonry>
            </ResponsiveMasonry> */}
            <DashboardCard/>
            
        </div>
    );
}

export default Dashboard;