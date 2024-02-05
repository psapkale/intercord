import TestCard from "@/components/TestCard";
import { callTestDriver } from "@/utils/driver";
import { useUserDetails } from "@/utils/store";

const Test = () => {
  const user = useUserDetails((state) => state.user);
  const updateTutorial = useUserDetails((state) => state.updateTutorial);
  // const [tests, setTests] = useState<Object[]>([]);

  if (user.isSignedUp && user.testDriverJs) {
    updateTutorial("testDriverJs");
    callTestDriver();
  }
  return (
    <div className="w-full h-full pl-[6rem] pt-[2rem]">
      <h1 className="text-5xl font-bold font-mono">Test</h1>
      <span className="font-mono text-sm pl-2">Plan your Tests</span>
      <div
        className="w-[90%] h-[80%] mt-5 flex flex-col gap-6 p-2 overflow-y-scroll"
        id="testdiv"
      >
        {Array(10)
          .fill(0)
          .map((val, i) => (
            <TestCard key={i} idx={i} />
          ))}
      </div>
    </div>
  );
};

export default Test;
