const SecondSectionMarquee = () => {
  return (
    <div>
      <div className="relative flex overflow-x-hidden font-semibold font-sans bg-[#0f0f0f] text-white py-4 items-center">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-[5rem] mx-4 font-zyada">Mcq</span>
          <span className="text-[5rem] mx-4">Based</span>
          <span className="text-[5rem] mx-4">Examination</span>
          <span className="text-[5rem] mx-4">System</span>
          <span className="text-[5rem] mx-4">Portal</span>
        </div>

        <div className="absolute animate-marquee2 whitespace-nowrap">
          <span className="text-[5rem] mx-4 font-zyada">Mcq</span>
          <span className="text-[5rem] mx-4">Based</span>
          <span className="text-[5rem] mx-4">Examination</span>
          <span className="text-[5rem] mx-4">System</span>
          <span className="text-[5rem] mx-4">Portal</span>
        </div>
      </div>
    </div>
  );
};

export default SecondSectionMarquee;
