import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I deliver premium, results-driven 
web and app experiences that 
give you an unfair advantage`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection 
        isMobile={isMobile}
        subTitle={"Hello I Am"}
        title={"Jayesh Patil"}
        text={text}
        textColor={"text-black"}
      />
      {!isMobile && (
        <div className="w-[190px] h-[40px] bg-[#D6D6D6] absolute bottom-4 right-0"></div>  
      )}
      {!isMobile && (
        <figure
          className="absolute inset-0 -z-50"
          style={{ width: "100vw", height: "100vh" }}
        >
          <iframe 
            src='https://my.spline.design/threadsfeatureheaderanimation-Jo4MNuTQ2hXTsjuncOuQ2A8B/' 
            frameBorder='0' 
            width='100%' 
            height='100%' 
            loading="lazy"
          />
        </figure>
      )}
    </section>
  );
};

export default Hero;
