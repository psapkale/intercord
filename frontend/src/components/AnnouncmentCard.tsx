const AnnouncmentCard = ({
  title,
  description,
  creator,
}: {
  title: string;
  description: string;
  creator: string;
}) => {
  return (
    <div className="w-full flex flex-col border-b pb-2">
      <h1 className="text-2xl font-semibold">
        {creator}: <span className="uppercase">{title}</span>
      </h1>
      <p className="w-[99%] md:w-[90%] lg:w-[80%] xl:w-[70%] text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default AnnouncmentCard;
