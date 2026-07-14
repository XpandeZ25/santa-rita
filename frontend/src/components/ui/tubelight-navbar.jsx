import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils.js";

export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "");

  useEffect(() => {
    const getActiveFromLocation = () => {
      const hash = window.location.hash || "#inicio";
      const currentPath = window.location.pathname;
      const match =
        items.find((item) => item.url === `${currentPath}${hash}`) ||
        items.find((item) => item.url.endsWith(hash)) ||
        items.find((item) => item.url === currentPath);

      if (match) setActiveTab(match.name);
    };

    getActiveFromLocation();
    window.addEventListener("hashchange", getActiveFromLocation);
    window.addEventListener("popstate", getActiveFromLocation);
    return () => {
      window.removeEventListener("hashchange", getActiveFromLocation);
      window.removeEventListener("popstate", getActiveFromLocation);
    };
  }, [items]);

  return (
    <nav className={cn("tubelight-navbar", className)} aria-label="Navegacion principal">
      <div className="tubelight-shell">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn("tubelight-link", isActive && "active")}
            >
              <span className="tubelight-label">{item.name}</span>
              <span className="tubelight-icon" aria-hidden="true">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.span
                  layoutId="lamp"
                  className="tubelight-lamp"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <span className="tubelight-beam">
                    <span />
                    <span />
                    <span />
                  </span>
                </motion.span>
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
