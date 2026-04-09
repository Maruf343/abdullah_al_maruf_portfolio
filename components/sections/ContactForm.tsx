"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaComment, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const createParticles = () =>
  Array.from({ length: 25 }, (_, i) => ({
    id: i,
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    r: Math.random() * 2 + 1,
  }));

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState<{ id: number; cx: number; cy: number; r: number }[]>([]);

  useEffect(() => {
    setParticles(createParticles());
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] px-6 py-16 md:px-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Particles */}
      <svg className="absolute inset-0 w-full h-full -z-10">
        {particles.map((p) => (
          <circle key={p.id} cx={`${p.cx}%`} cy={`${p.cy}%`} r={p.r} fill="rgba(99,102,241,0.15)" />
        ))}
      </svg>

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Contact</p>
        <h2 className="mt-4 text-4xl font-extrabold text-slate-950 dark:text-white sm:text-5xl">
          Let’s build something great together.
        </h2>
      </div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid gap-10 rounded-[2rem] border border-indigo-200/20 bg-white/80 p-6 sm:p-8 shadow-xl backdrop-blur-xl dark:border-indigo-500/20 dark:bg-gray-900/80 grid-cols-1 md:grid-cols-[0.8fr_1.2fr] lg:gap-12"
      >
        {/* LEFT SIDE */}
        <div className="rounded-[2rem] border border-indigo-200/20 bg-white/70 p-6 sm:p-8 backdrop-blur-xl dark:border-indigo-500/20 dark:bg-gray-900/70">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Get in Touch</h3>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-600" />
              <span className="break-words">abdullah.almaruf1121@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-600" />
              <span>+8801571350711</span>
            </div>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-indigo-600" />
              <span>Tejgaon, Dhaka, Bangladesh</span>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="/images/Mohammad_abdullah_al_maruf (1).pdf"
              download
              className="inline-flex justify-center w-full rounded-2xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-500 transition"
            >
              Download CV
            </a>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="peer w-full pl-12 pt-5 pb-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <label className="absolute left-12 top-2 text-gray-500 text-sm transition-all duration-150
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Your Name
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="peer w-full pl-12 pt-5 pb-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <label className="absolute left-12 top-2 text-gray-500 text-sm transition-all duration-150
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Your Email
            </label>
          </div>

          {/* Message */}
          <div className="relative">
            <FaComment className="absolute left-4 top-4 text-gray-400" />
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              className="peer w-full pl-12 pt-5 pb-2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
            />
            <label className="absolute left-12 top-2 text-gray-500 text-sm transition-all duration-150
              peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Your Message
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 py-4 text-white font-semibold shadow-lg hover:bg-indigo-500 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </motion.form>
    </section>
  );
}