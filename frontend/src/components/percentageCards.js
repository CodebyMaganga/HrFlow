import { Card } from "primereact/card";
import { AiOutlineRise } from "react-icons/ai";

const PercentCard = ({ title, users }) => {
  console.log("persent card---> users", users);
  const percentage = users ? ( users.users.length - 0 / 100) * 100 : 0

  return (
    <div className="mt-4 ">
      <Card
        className="bg-white w-40 h-35 text-center rounded-lg py-4 "
        title={title}
      >
        <div className="flex justify-center items-center gap-2">
          <p className="m-0 font-bold text-xl">{users && users.users.length}</p>
          <AiOutlineRise className="text-green-400 " />
          <p className={percentage > 100 ? "text-green-400 text-sm" : "text-red-500"}>{percentage}%</p>
        </div>
      </Card>
    </div>
  );
};

export default PercentCard;
