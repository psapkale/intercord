import { PendingStudentType } from "@/pages/Requests";
import { useState } from "react";

// pls fix teacher type
const RequestCard = ({
  student,
  handleAccept,
  handleReject,
}: {
  student: PendingStudentType;
  handleAccept: (username: string) => void;
  handleReject: (username: string) => void;
}) => {
  const [openInfoPanel, setOpenInfoPanel] = useState(false);

  return (
    <div className="w-full h-fit p-2 group border border-black rounded-lg flex flex-col hover:shadow-lg">
      <div className="w-full flex items-center justify-between">
        <p className="text-lg font-mono">
          <h1
            className="inline font-bold hover:underline cursor-pointer"
            onClick={() => setOpenInfoPanel((prev) => !prev)}
          >
            {student.name}
          </h1>{" "}
          request to join
        </p>
        <div className="flex gap-2 items-center">
          <button
            className="py-[0.30rem] px-3 border border-black hover:bg-black hover:text-white rounded-lg text-lg font-mono font-bold"
            onClick={() => {
              handleAccept(student.username);
            }}
          >
            Accept
          </button>
          <button
            className="py-[0.30rem] px-3 border border-red-500 hover:bg-red-500 hover:text-white rounded-lg text-lg font-mono font-bold"
            onClick={() => {
              handleReject(student.username);
            }}
          >
            Decline
          </button>
        </div>
      </div>
      {/* show on click */}
      {openInfoPanel && (
        <div className="ml-1 text-[1rem] text-slate-900 font-mono">
          <h1 className="flex gap-1">
            <h1 className="font-bold">Name:</h1>
            <div>{student.name}</div>
          </h1>
          <h1 className="flex gap-1">
            <h1 className="font-bold">Email:</h1>
            <div>{student.email}</div>
          </h1>
          <h1 className="flex gap-1">
            <h1 className="font-bold">Academic Year:</h1>
            <div>{student.academicYear}</div>
          </h1>
          <h1 className="flex gap-1">
            <h1 className="font-bold">Stream:</h1>
            <div>{student.stream}</div>
          </h1>
          <h1 className="flex gap-1">
            <h1 className="font-bold">Pursuing Year:</h1>
            <div>{student.pursuingYear}</div>
          </h1>
        </div>
      )}
    </div>
  );
};

export default RequestCard;
