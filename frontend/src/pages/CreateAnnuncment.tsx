import { useUserDetails } from "@/utils/store";
import axios from "axios";
import { BellRing } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateAnnuncment = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const user = useUserDetails((state) => state.user);
  const updateAnnouncement = useUserDetails(
    (state) => state.updateAnnouncement
  );

  // creating new announcement
  const handleCreateAnnouncement = async () => {
    try {
      const data = await axios.post(
        `http://localhost:3000/api/${user.role}/create-announcment`,
        {
          title,
          description,
          creator: user.name,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success(data?.data?.message);
      updateAnnouncement(data?.data?.announcment);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error, "Error in create announcement");
    }
  };

  return (
    <div className="w-full h-fit pl-[1.5rem] sm:pl-[2rem] md:pl-[6rem] pt-[2rem] overflow-y-scroll py-8">
      <h1 className="uppercase text-3xl xs:text-4xl sm:text-4xl max-md:mt-5 md:text-5xl font-semibold">
        Create Announcement
      </h1>
      <div className="w-full h-fit mt-4 sm:mt-6 md:mt-10 flex flex-col gap-10 pr-10">
        <div className="flex flex-col font-zyada">
          <label htmlFor="title" className="font-bold text-2xl flex gap-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-[#F7F7F8] rounded-md py-2 text-black text-xl px-2 font-bold tracking-[0.1rem] w-[90%] lg:w-[20rem] outline-none"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div className="flex flex-col font-zyada">
          <label
            htmlFor="description"
            className="font-bold text-2xl flex gap-2"
          >
            Description
          </label>
          <textarea
            placeholder="description..."
            id="description"
            className="outline-none text-2xl bg-[#F7F7F8] font-semibold rounded-md p-2 w-full lg:w-[30rem]"
            cols={10}
            rows={5}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
          />
        </div>
        <button
          className="w-fit flex gap-2 items-center justify-center rounded-md bg-[#222222] text-white hover:bg-[#0f0f0f] border py-2 px-4"
          onClick={handleCreateAnnouncement}
        >
          Announce
          <BellRing className="size-4 mt-1" />
        </button>
      </div>
    </div>
  );
};

export default CreateAnnuncment;
