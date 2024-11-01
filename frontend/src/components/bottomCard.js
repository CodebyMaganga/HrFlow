import UpcomingEvents from "./upcomingEvents"
import NewsCard from "./newsEvents"

const BottomCard = () =>{
    return (
        <>
            <div className="mt-4 flex gap-4">
                <div className="w-1/2">
                    <UpcomingEvents />
                </div>
                <div className="w-1/2">
                    <NewsCard />
                </div>


            </div>
        </>
    )
}


export default BottomCard