import { useEffect, useState } from "react";

const useTestsAsPerTime = (typeOfTestShowing: string) => {
  const [loading, setLoading] = useState(true);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [typeOfTestShowing]);
  return { tests, loading };
};

export default useTestsAsPerTime;
