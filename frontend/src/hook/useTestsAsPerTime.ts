/* eslint-disable @typescript-eslint/no-unused-vars */
import { useUserDetails } from "@/utils/store";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export type TestType = {
  readonly _id: string;
  subject: string;
  description: string;
  startDate: string;
};

const useTestsAsPerTime = (
  typeOfTestShowing: string = "",
  fetchByField: boolean = true
) => {
  const [loading, setLoading] = useState(true);
  const [bookMarkLoading, setBookMarkLoading] = useState(false);
  const [tests, setTests] = useState<TestType[]>();
  const user = useUserDetails((state) => state.user);
  const bookmarkUpdate = useUserDetails((state) => state.bookmarkUpdate);
  const removeFromBookMark = useUserDetails(
    (state) => state.removeFromBookMark
  );

  const fetchTestBasedOnField = async () => {
    setLoading(true);
    try {
      setTests([]);
      const data = await axios.get(
        `http://localhost:3000/api/${typeOfTestShowing}`
      );

      setLoading(false);
      setTests(data?.data?.[typeOfTestShowing]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // handling bookmark/unbookmark of test
  const handelBookmark = async (_id: string) => {
    setBookMarkLoading(true);
    const toastId = toast.loading("Updating...");
    try {
      const data = await axios.post(
        "http://localhost:3000/api/student/bookmark",
        {
          testId: _id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setBookMarkLoading(false);
      toast.dismiss(toastId);

      // checking if test removed from bookmark or added
      if (data?.data?.message == "Test Bookmark Succesfully")
        bookmarkUpdate(_id);
      else removeFromBookMark(_id);
    } catch (err) {
      console.log(err);
      setBookMarkLoading(false);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (fetchByField) fetchTestBasedOnField();
  }, [typeOfTestShowing]);
  return { tests, loading, handelBookmark, bookMarkLoading };
};

export default useTestsAsPerTime;
