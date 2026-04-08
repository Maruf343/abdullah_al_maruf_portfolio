"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFirebase, SiMongodb, SiExpress } from "react-icons/si";
import { useRef, useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const skillCategories = [
  {
    category: "Frontend",
    glowColor: "rgba(99,102,241,0.18)",
    icon: <FaReact size={28} className="text-indigo-500" />,
    skills: [
      { name: "React", level: 95, icon: <FaReact className="text-indigo-500 w-6 h-6" /> },
      { name: "Next.js", level: 90, icon: <SiNextdotjs className="w-6 h-6 text-indigo-600" /> },
      { name: "Tailwind CSS", level: 95, icon: <SiTailwindcss className="w-6 h-6 text-indigo-400" /> },
      { name: "TypeScript", level: 88, icon: <FaJsSquare className="text-yellow-400 w-6 h-6" /> },
    ],
  },
  {
    category: "Backend",
    glowColor: "rgba(34,197,94,0.15)",
    icon: <FaNodeJs size={28} className="text-green-500" />,
    skills: [
      { name: "Node.js", level: 85, icon: <FaNodeJs className="text-green-500 w-6 h-6" /> },
      { name: "Express.js", level: 82, icon: <SiExpress className="w-6 h-6 text-green-400" /> },
      { name: "Firebase", level: 80, icon: <SiFirebase className="w-6 h-6 text-indigo-500" /> },
    ],
  },
  {
    category: "Database",
    glowColor: "rgba(168,85,247,0.15)",
    icon: <FaDatabase size={28} className="text-purple-500" />,
    skills: [
      { name: "MongoDB", level: 80, icon: <SiMongodb className="text-green-700 w-6 h-6" /> },
      { name: "PostgreSQL", level: 75, icon: <FaDatabase className="text-purple-500 w-6 h-6" /> },
      { name: "MySQL", level: 70, icon: <FaDatabase className="text-blue-500 w-6 h-6" /> },
    ],
  },
];

export default function Skills() {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Floating particles
  useEffect(() => {
    const tempParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1.5,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.25 + 0.05,
    }));
    setParticles(tempParticles);

    const moveParticles = () => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y - p.speed < 0 ? window.innerHeight : p.y - p.speed,
        }))
      );
      requestAnimationFrame(moveParticles);
    };
    moveParticles();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-8 md:p-12 shadow-2xl backdrop-blur-xl dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 dark:border-gray-800"
    >
      {/* Floating particles */}
      <svg className="absolute inset-0 w-full h-full -z-20">
        {particles.map(p => (
          <circle key={p.id} cx={p.x} cy={p.y} r={p.size} fill="rgba(99,102,241,0.1)" fillOpacity={p.opacity} />
        ))}
      </svg>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500 dark:text-gray-400">Core Expertise</p>
        <h2 className="mt-4 text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
          My <span className="text-indigo-500">Skills</span>
        </h2>
        <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          I am a <strong>MERN Stack</strong> developer with expertise in frontend, backend, and databases. 
          I build scalable, responsive applications focusing on **performance, design, and user experience**.
        </p>
      </div>

      {/* Skill Grid */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 relative z-10">
        {skillCategories.map(category => (
          <motion.div
            key={category.category}
            className="relative bg-white/90 dark:bg-gray-950/80 rounded-3xl p-8 shadow-xl border border-gray-200/20 dark:border-gray-800/50 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 -z-10 blur-3xl rounded-3xl"
              style={{ backgroundColor: category.glowColor }}
            />

            <div className="flex items-center gap-3 mb-6">
              {category.icon}
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{category.category}</h3>
            </div>

            <div className="flex flex-wrap gap-6">
              {category.skills.map(skill => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col w-full sm:w-48 md:w-56 lg:w-64 bg-white/80 dark:bg-gray-900/70 rounded-2xl shadow-lg p-4 cursor-pointer border border-gray-200/30 dark:border-gray-800/30 backdrop-blur-md hover:scale-105 hover:shadow-indigo-400/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(0,0,0,0.2)" }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {skill.icon}
                    <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                    <span className="ml-auto text-sm text-gray-500 dark:text-gray-300">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}