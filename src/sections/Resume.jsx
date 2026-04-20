import React from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { RESUME_URL } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Resume = () => {
    useGSAP(() => {
        gsap.to("#resume", {
            scale: 0.95,
            scrollTrigger: {
                trigger: "#resume",
                start: "bottom 80%",
                end: "bottom 20%",
                scrub: true,
                markers: false,
            },
            ease: "power1.inOut",
        });
    }, { dependencies: [] });

    const handleDownload = async (e) => {
        e.preventDefault();
        try {
            // Append timestamp to bypass caching
            const response = await fetch(`${RESUME_URL}?t=${new Date().getTime()}`);
            if (!response.ok) throw new Error("Network response was not ok");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Jayesh_Patil_Resume.pdf");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed, falling back to direct link", error);
            // Fallback
            window.open(RESUME_URL, "_blank");
        }
    };

    return (
        <section
            id="resume"
            className="flex flex-col justify-center min-h-[60vh] py-20 bg-black rounded-b-4xl text-white"
        >
            <AnimatedHeaderSection
                subTitle={"A summary of my experience"}
                title={"Resume"}
                text={`You can preview my latest resume online\nor download a copy for your records.`}
                textColor={"text-[#ffffff]"}
                withScrollTrigger={true}
            />
            <div className="flex flex-col items-center justify-center gap-6 mt-12 sm:flex-row">
                <a
                    href={`${RESUME_URL}?t=${new Date().getTime()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 uppercase tracking-widest text-[#ffffff] border border-[#ffffff] rounded-full hover:bg-[#ffffff] hover:text-gold transition-all duration-300 font-medium w-full sm:w-auto text-center"
                >
                    View Resume
                </a>
                <button
                    onClick={handleDownload}
                    className="px-8 py-4 uppercase tracking-widest text-black bg-[#ffffff] rounded-full hover:bg-gold transition-all duration-300 font-medium w-full sm:w-auto text-center"
                >
                    Download PDF
                </button>
            </div>
        </section>
    );
};

export default Resume;
