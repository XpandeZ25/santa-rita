import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../lib/utils.js";

export default function ScrollExpandMedia({
  mediaType = "image",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend = false,
  className,
  children
}) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const mediaWidth = useTransform(scrollYProgress, [0, 0.72], ["min(440px, 84vw)", "min(1120px, 94vw)"]);
  const mediaHeight = useTransform(scrollYProgress, [0, 0.72], ["min(430px, 62vh)", "min(620px, 76vh)"]);
  const mediaRadius = useTransform(scrollYProgress, [0, 0.72], [24, 8]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.72], [0.95, 0.42]);
  const titleOffsetLeft = useTransform(scrollYProgress, [0, 0.72], ["0vw", "-5vw"]);
  const titleOffsetRight = useTransform(scrollYProgress, [0, 0.72], ["0vw", "5vw"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.18], [0.96, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.28], [10, 0]);

  const firstLine = title?.includes("SANTA RITA") ? "INSTITUTO TECNICO EN SALUD" : (title?.split(" ").slice(0, 3).join(" ") || "");
  const secondLine = title?.includes("SANTA RITA") ? '"SANTA RITA" SRL' : (title?.split(" ").slice(3).join(" ") || "");

  return (
    <section id="inicio" ref={sectionRef} className={cn("scroll-expand", className)}>
      <div className="scroll-expand-sticky">
        <motion.div className="scroll-expand-bg" style={{ opacity: bgOpacity }}>
          <img src={bgImageSrc || mediaSrc} alt="" aria-hidden="true" />
        </motion.div>

        <motion.div
          className="scroll-expand-media"
          style={{ width: mediaWidth, height: mediaHeight, borderRadius: mediaRadius }}
        >
          {mediaType === "video" ? (
            <video src={mediaSrc} poster={posterSrc} autoPlay muted loop playsInline preload="metadata" />
          ) : (
            <img src={mediaSrc} alt={title || "Instituto Santa Rita"} />
          )}
          <div className="scroll-expand-media-shade" />
        </motion.div>

        <div className={cn("scroll-expand-title", textBlend && "blend")}>
          {date && <span className="scroll-expand-eyebrow">{date}</span>}
          <motion.h1 style={{ x: titleOffsetLeft }}>{firstLine}</motion.h1>
          {secondLine && <motion.h1 style={{ x: titleOffsetRight }}>{secondLine}</motion.h1>}
          {scrollToExpand && <span className="scroll-expand-hint">{scrollToExpand}</span>}
        </div>

        <motion.div className="scroll-expand-content" style={{ opacity: contentOpacity, y: contentY }}>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
