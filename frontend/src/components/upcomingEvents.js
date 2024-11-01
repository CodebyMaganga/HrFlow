import { Card } from "primereact/card";
import { CiCalendar } from "react-icons/ci";
import events from "../assets/events";
import dayjs from "dayjs";

const UpcomingEvents = () =>{
    return (
        <>
        <div className="">
        <Card  className="bg-white rounded-lg h-[200px]  px-4">
            <div className="py-4 flex justify-between items-center">
            <p className="font-semibold">Upcoming Event</p> 
            <CiCalendar className="text-2xl mr-6 " />

            </div>
            
            <div className="h-[100px] overflow-y-scroll">
            {events.map(event =>(
                <div className="border border-gray-300 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                    <p className="font-bold">{dayjs(event.date).format('MMMM-DD').replace('-', ' ')}</p>
                    <p className="font-bold">{event.name}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <p>{event.time}</p>
                        <p>{event.description}</p>
                    </div>
                    <div className="mt-2">
                        <button className="bg-[#5e1b72] text-white px-4 rounded-lg">Zoom Meeting</button>
                    </div>
                </div>
                
            ))}
            </div>
        </Card>
        </div>
       
        </>
    )
}

export default UpcomingEvents