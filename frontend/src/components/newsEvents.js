import { Panel } from 'primereact/panel';
import companyNews from '../assets/news';


const NewsCard = ()=>{
    return (
       <div className=''>
        <div>
        <Panel className='bg-white h-[200px] rounded-lg overflow-y-scroll' >
            <p className='text-center mt-4 font-semibold'>What's new today?</p>
                {companyNews.map(record =>(
                    <div className='my-4 ml-2 py-6 border flex justify-between border-gray-300 rounded-lg'>
                        <div className='flex'>
             
                            <img src={record.imageUrl} alt='News report' className='w-[30%] h-[100px] rounded-md ml-2'/>
                       
                            <div className='flex-col '>
                            <p className='font-semibold ml-4'>{record.title}</p>
                            <p className='text-wrap ml-4 text-sm'>{record.content}</p>
                            <p className='text-wrap ml-4 text-sm mt-4 text-blue-400 cursor-pointer'>See more</p>
                            </div>
                         
                        
                       
                        </div>
                       
                   
                       
                    </div>
                ))}
</Panel>
        </div>
       </div>
    )
}

export default NewsCard