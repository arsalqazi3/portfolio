"use client";

import { useEffect, useRef, useState } from "react";

type DemoVideoProps = {
  src: string;
};

/** Autoplays once scrolled into view, instead of on page load, so a large demo
 * clip doesn't compete with the rest of the page for bandwidth on first paint. */
export default function DemoVideo({ src }: DemoVideoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-3 aspect-video w-full overflow-hidden rounded border border-ink-soft bg-ink-soft/20"
    >
      {visible && (
        <video autoPlay muted loop playsInline controls className="h-full w-full object-cover">
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
