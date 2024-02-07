import { Skeleton } from "primereact/skeleton";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

export const InputLabel = () => {
  return (
    <div className="flex flex-col">
      <div className="w-[12rem] md:w-[40%] lg:w-[8rem]">
        <Skeleton width="100%" className="py-4 -mb-5" />;
      </div>
      <div className="w-[90%] lg:w-[20rem]">
        <Skeleton width="100%" className="py-5 rounded-md" />;
      </div>
    </div>
  );
};
