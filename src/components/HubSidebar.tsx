type SidebarItem = { label: string; id: string };

/** Sticky jump-list of the items on THIS page (e.g. each project, each
 * leadership entry) in the dash+label style, not the global site nav
 * duplicated. Desktop only; mobile just scrolls the list directly. */
export default function HubSidebar({ items }: { items: SidebarItem[] }) {
  return (
    <nav aria-label="On this page" className="sticky top-24 hidden h-fit w-40 shrink-0 md:block">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-300 hover:text-offwhite"
            >
              <span className="h-px w-4 shrink-0 bg-ink-soft transition-all duration-300 group-hover:w-6 group-hover:bg-offwhite" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
