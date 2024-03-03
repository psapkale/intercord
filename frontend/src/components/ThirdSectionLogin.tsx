// import AuthImage from "./../assets/Wavy_Gen-01_Single-07.jpg";
import demoVideo from "./../assets/demoVideo.mp4";

const ThirdSectionLogin = () => {
  return (
    <div className="w-full h-screen font-bona containerBg flex max-md:justify-center max-md:flex-col-reverse max-md:px-4">
      <div className="md:h-full w-full md:w-[50%] flex justify-center items-center md:px-10">
        <div className="w-full h-full max-md:mt-10 md:h-[60%] bg-white rounded-lg shadow-lg">
          <video
            src={demoVideo}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            controls
          ></video>
        </div>
      </div>
      <div className="md:h-full w-full md:w-[50%] flex justify-center flex-col gap-4 items-center md:px-10">
        <h1 className="text-4xl sm:text-5xl font-semibold">
          How to login/Signup?
        </h1>
        {/* <div className="w-[80%] shadow-lg object-cover h-[70%] overflow-hidden rounded-md">
          <img
            src={AuthImage}
            className="w-full h-full hover:scale-110 transition"
            alt="auth-img"
          />
        </div> */}
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo et atque
          voluptates magni ratione, excepturi dolorem facere nesciunt in quaerat
          tempore assumenda error, reiciendis debitis voluptatem incidunt eos
          sequi accusamus est tenetur eveniet eum aliquam. Iusto esse debitis
          sint odio architecto dolor perspiciatis, recusandae, libero
          accusantium delectus explicabo ut id! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Possimus perferendis doloribus
          distinctio, quisquam totam molestiae est saepe quasi numquam, quo
          incidunt delectus optio, voluptatum consequatur expedita tempore amet?
          Nisi quia error in, quaerat incidunt optio accusamus ea cumque
          deserunt, mollitia nostrum! Eveniet maiores ex qui pariatur
          voluptatibus aliquid ut impedit.
        </p>
      </div>
    </div>
  );
};

export default ThirdSectionLogin;
