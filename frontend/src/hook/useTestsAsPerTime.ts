import axios from "axios";
import { useEffect, useState } from "react";

type TestType = {
  readonly _id: string;
  subject: string;
  description: string;
  startDate: string;
};

const useTestsAsPerTime = (typeOfTestShowing: string) => {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState<TestType[]>();

  const fetchTestBasedOnField = async () => {
    setLoading(true);
    try {
      setTests([]);
      const data = await axios.get(
        `http://localhost:3000/api/${typeOfTestShowing}`
      );

      setLoading(false);
      setTests(data?.data?.notStartedTests);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestBasedOnField();
  }, [typeOfTestShowing]);
  return { tests, loading };
};

export default useTestsAsPerTime;
