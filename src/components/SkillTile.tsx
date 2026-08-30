import Image from "next/image";

type SkillTileProps = {
  name: string;
  /** A Simple Icons single-path mark, raw multi-path markup for brands (AWS, Oracle,
   * EKS, Certbot) that publish official multi-color logos outside Simple Icons, or a
   * raster image for the rare tool (gitleaks) whose only real logo is a PNG. */
  icon?: { path: string; hex: string } | { markup: string; viewBox: string } | { img: string };
};

/** Real brand mark on a light chip (so dark-branded logos like OWASP's black stay visible
 * on this site's dark background), name below. Falls back to initials only when no official
 * mark exists anywhere at all: GitOps and REST APIs are practices/standards, not products,
 * so there's no logo to have. */
export default function SkillTile({ name, icon }: SkillTileProps) {
  const isMarkup = icon && "markup" in icon;
  const isImg = icon && "img" in icon;

  return (
    <div className="flex flex-col items-center gap-2.5 rounded border border-ink-soft bg-ink-soft/20 px-3 py-4 text-center transition-colors duration-300 hover:border-copper/40">
      {icon ? (
        <span className="flex h-9 w-9 items-center justify-center rounded bg-offwhite">
          {isMarkup ? (
            <svg
              viewBox={icon.viewBox}
              className="h-5 w-5"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: icon.markup }}
            />
          ) : isImg ? (
            <Image src={icon.img} alt="" width={20} height={20} className="h-5 w-5 object-contain" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill={`#${icon.hex}`} aria-hidden="true">
              <path d={icon.path} />
            </svg>
          )}
        </span>
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded border border-ink-soft font-mono text-[10px] text-muted">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-xs leading-tight text-muted">{name}</span>
    </div>
  );
}
