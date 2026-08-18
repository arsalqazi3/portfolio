/** Short horizontal rule preceding a row title, echoing a table-of-contents mark.
 * Lives inside a `group`-hover row/link so it can pick up the same hover state. */
export default function TitleRule() {
  return (
    <span
      className="h-px w-5 shrink-0 bg-ink-soft transition-colors duration-300 group-hover:bg-copper"
      aria-hidden="true"
    />
  );
}
