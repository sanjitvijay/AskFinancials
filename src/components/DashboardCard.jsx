import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

function DashboardCard() {
    return (
        <div className="card flex w-96 h-60 shadow-md shadow-primary p-2 border border-primary">
            <div className="flex justify-between">
                <h1 className="text-secondary text-2xl font-bold">SolarEdge</h1>
                <h1 className="text-secondary text-2xl font-bold">SEDG</h1>
            </div>  
            
        </div>
    );
}

export default DashboardCard;