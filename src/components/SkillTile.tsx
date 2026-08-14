type SkillTileProps = {
  name: string;
  icon?: { path: string; hex: string };
};

/** Real brand mark on a light chip (so dark-branded logos like OWASP's black stay visible
 * on this site's dark background), name below. Falls back to initials when no official
 * mark is available (a few tools here don't have one in Simple Icons: AWS and Oracle
 * among them, both keep their logos out of open icon sets). */
export default function SkillTile({ name, icon }: SkillTileProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded border border-ink-soft bg-ink-soft/20 px-3 py-4 text-center transition-colors duration-300 hover:border-copper/40">
      {icon ? (
        <span className="flex h-9 w-9 items-center justify-center rounded bg-offwhite">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill={`#${icon.hex}`} aria-hidden="true">
            <path d={icon.path} />
          </svg>
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
