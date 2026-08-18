type StatusTagProps = {
  status: "In Progress" | "Completed";
  className?: string;
};

export default function StatusTag({ status, className = "" }: StatusTagProps) {
  // A finished project is the assumed default; only the exception is worth flagging.
  if (status !== "In Progress") return null;

  return (
    <span className={`font-mono text-[11px] uppercase tracking-widest text-copper ${className}`}>
      {status}
    </span>
  );
}
