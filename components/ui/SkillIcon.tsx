import {
  FaAws,
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaJsSquare,
  FaLinux,
  FaNodeJs,
  FaReact,
  FaServer,
} from "react-icons/fa";
import {
  SiCss3,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGithub,
  SiHtml5,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

const iconMap = {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaJsSquare,
  FaGitAlt,
  FaCss3Alt,
  FaHtml5,
  FaDocker,
  FaAws,
  FaLinux,
  FaServer,
  FaCode,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiMongodb,
  SiExpress,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiVercel,
  SiTypescript,
  SiNodedotjs,
  SiCss3,
  SiHtml5,
};

type SkillIconProps = {
  iconName?: string | null;
  name?: string;
  className?: string;
};

export default function SkillIcon({ iconName, name, className = "h-6 w-6" }: SkillIconProps) {
  const normalized = (iconName || "").trim();
  const IconComponent = normalized ? iconMap[normalized as keyof typeof iconMap] : undefined;

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  const lowerName = (name || "").toLowerCase();
  if (lowerName.includes("react")) return <FaReact className={className} />;
  if (lowerName.includes("next")) return <SiNextdotjs className={className} />;
  if (lowerName.includes("tailwind")) return <SiTailwindcss className={className} />;
  if (lowerName.includes("typescript") || lowerName.includes("javascript")) return <FaJsSquare className={className} />;
  if (lowerName.includes("node")) return <FaNodeJs className={className} />;
  if (lowerName.includes("express")) return <SiExpress className={className} />;
  if (lowerName.includes("firebase")) return <SiFirebase className={className} />;
  if (lowerName.includes("mongo")) return <SiMongodb className={className} />;
  if (lowerName.includes("postgres") || lowerName.includes("sql")) return <SiPostgresql className={className} />;
  if (lowerName.includes("docker")) return <FaDocker className={className} />;
  if (lowerName.includes("git")) return <FaGitAlt className={className} />;
  if (lowerName.includes("css")) return <FaCss3Alt className={className} />;
  if (lowerName.includes("html")) return <FaHtml5 className={className} />;

  return <FaCode className={className} />;
}
