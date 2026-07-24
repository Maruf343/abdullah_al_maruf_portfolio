"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";
import SkillIcon from "../ui/SkillIcon";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

type SkillRecord = {
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  order: number;
};

type SkillsProps = {
  skills: SkillRecord[];
};

const getCategoryGlow = (category: string) => {
  if (category.toLowerCase().includes("front")) return "rgba(99,102,241,0.18)";
  if (category.toLowerCase().includes("back")) return "rgba(34,197,94,0.15)";
  return "rgba(168,85,247,0.15)";
};

const getCategoryIcon = (category: string) => {
  if (category.toLowerCase().includes("front")) return <FaReact size={28} className="text-indigo-500" />;
  if (category.toLowerCase().includes("back")) return <FaNodeJs size={28} className="text-green-500" />;
  return <FaDatabase size={28} className="text-purple-500" />;
};

export default function Skills({ skills }: SkillsProps) {
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

  const groupedSkills = skills.reduce<Record<string, SkillRecord[]>>((acc, skill) => {
    const category = skill.category || "General";
    acc[category] = [...(acc[category] || []), skill];
    return acc;
  }, {});

  const categories = Object.entries(groupedSkills)
    .map(([category, items]) => ({
      category,
      glowColor: getCategoryGlow(category),
      icon: getCategoryIcon(category),
      skills: items.sort((a, b) => a.order - b.order),
    }))
    .sort((a, b) => a.category.localeCompare(b.category));

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
      {categories.length === 0 ? (
        <div className="relative z-10 rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">No skills yet</p>
          <p className="mt-2 text-sm">Add skills from the admin dashboard to populate this section.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 relative z-10">
          {categories.map(category => (
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600">
                        <SkillIcon iconName={skill.icon} name={skill.name} className="h-5 w-5" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                      <span className="ml-auto text-sm text-gray-500 dark:text-gray-300">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}