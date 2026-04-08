"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaNewspaper, FaExternalLinkAlt } from "react-icons/fa";

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

export default function TechNews() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/api/tech-news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative px-6 md:px-24 py-24 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-gray-900 dark:to-slate-950">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[420px] w-[420px] bg-indigo-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto"
      >
        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">
            Tech News
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white">
            Latest Technology Updates
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Stay updated with the latest tech news and trends
          </p>
        </div>

        {/* NEWS GRID */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80 hover:shadow-xl transition-all duration-300"
              >
                {/* Image */}
                {article.urlToImage && (
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                    {article.description}
                  </p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                  >
                    Read more
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                </div>

                {/* Icon */}
                <div className="absolute top-4 right-4">
                  <div className="rounded-full bg-indigo-500/10 p-2">
                    <FaNewspaper className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}