import { Link } from "react-router-dom";

const TestCardSubject = ({
  srNo,
  testId,
  name,
}: {
  srNo: number;
  testId: string;
  name: string;
}) => {
  return (
    <div className="flex w-full py-2 px-2 mb-4 pl-4 hover:bg-gray-50">
      <h1 className="w-[10%] truncate">{srNo}</h1>
      <Link
        to={`/dashboard/test/${testId}`}
        className="w-[90%] truncate cursor-pointer"
      >
        {name}
      </Link>
    </div>
  );
};

export default TestCardSubject;
