import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingref = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>
      <div className="w-full relative min-h-screen font-['Helvetica_Now_Display']">
        {showCanvas &&
          data[0].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <div className="w-full relative z-[1] h-screen ">
          <nav className="w-full p-8 flex flex-col md:flex-row justify-between z-50 gap-8 md:gap-0">
            <div className="brand text-2xl font-md">thirtysixstudios</div>
            <div className="links flex flex-col md:flex-row gap-6 md:gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>

          <div className="textcontainer w-full px-4 md:px-[20%]">
            <div className="text w-full md:w-[50%]">
              <h3 className="text-2xl md:text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-base md:text-lg w-full md:w-[80%] mt-6 md:mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-sm md:text-md mt-8 md:mt-10">scroll</p>
            </div>
          </div>

          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-[4rem] md:text-[15rem] font-normal tracking-tight leading-none pl-2 md:pl-5"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full relative h-[80vh] md:h-screen mt-14 md:mt-32 px-4 md:px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => <Canvas details={canvasdets} />)}
        <h1 className="text-4xl md:text-8xl tracking-tighter">about the brand</h1>
        <p className="text-lg md:text-4xl leading-[1.6] md:leading-[1.8] w-full md:w-[80%] mt-6 md:mt-10 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <div className="w-[80vw] h-[50vw] md:w-[30vw] md:h-[30vw] bg-purple-400 mt-10">
          <img
            className="w-full h-full object-cover"
            src="https://i.pinimg.com/1200x/f6/93/de/f693de2f6cfafeacb63fce52d8d07b13.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default App;
