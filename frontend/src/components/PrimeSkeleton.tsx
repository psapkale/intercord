import { Skeleton } from "primereact/skeleton";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";

export const InputLabel = () => {
  return (
    <div className="flex flex-col">
      <Skeleton width="8rem" className="py-4 -mb-5" />;
      <Skeleton width="20rem" className="py-5 rounded-md" />;
    </div>
  );
};
