"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import heroImg from "../../public/images/maruf.png";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiMongodb } from "react-icons/si";
import Button from "../ui/Button";

const fullName = "Mohammad Abdullah Al Maruf";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullName.length) {
      const timeout = setTimeout(() => {
        setTyped(fullName.slice(0, index + 1));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-indigo-50 to-white p-4 sm:p-8 md:p-16 shadow-lg dark:from-gray-900 dark:to-gray-950">
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT: TEXT */}
        <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">

          <p className="text-indigo-600 font-medium tracking-wider uppercase text-sm dark:text-indigo-400">
            Frontend & MERN Stack Developer
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            {typed.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-indigo-500">
              {typed.split(" ").slice(-1).join(" ")}
            </span>
            <span className="blinking-cursor">|</span>
          </h1>

          <p className="text-gray-700 dark:text-gray-300 max-w-xl text-base sm:text-lg leading-relaxed">
            I build{" "}
            <span className="font-semibold text-indigo-500">
              modern, responsive, high-performance
            </span>{" "}
            web applications with{" "}
            <span className="font-semibold text-indigo-500">
              MongoDB, Express, React, Next.js, Node.js
            </span>.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
            <Button href="#projects">View Projects</Button>
            <Button href="#about" variant="ghost">About Me</Button>
          </div>

          {/* ICONS */}
          <div className="flex gap-4 mt-6 flex-wrap justify-center lg:justify-start">
            <FaReact className="text-indigo-500 w-7 h-7 sm:w-8 sm:h-8 animate-bounce-slow" />
            <SiNextdotjs className="text-black dark:text-white w-7 h-7 sm:w-8 sm:h-8 animate-bounce-slow" />
            <SiTailwindcss className="text-teal-400 w-7 h-7 sm:w-8 sm:h-8 animate-bounce-slow" />
            <FaNodeJs className="text-green-600 w-7 h-7 sm:w-8 sm:h-8 animate-bounce-slow" />
            <SiMongodb className="text-green-700 w-7 h-7 sm:w-8 sm:h-8 animate-bounce-slow" />
          </div>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
            <Image
              src={heroImg}
              alt="Mohammad Abdullah Al Maruf"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>

      {/* ANIMATION */}
      <style jsx>{`
        .blinking-cursor {
          margin-left: 5px;
          color: #6366f1;
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-bounce-slow {
          animation: bounce 2.5s infinite alternate;
        }
      `}</style>
    </section>
  );
}