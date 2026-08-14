type StatusTagProps = {
  status: "In Progress" | "Completed";
  className?: string;
};

export default function StatusTag({ status, className = "" }: StatusTagProps) {
  const color = status === "In Progress" ? "text-copper" : "text-muted";

  return (
    <span className={`font-mono text-[11px] uppercase tracking-widest ${color} ${className}`}>
      {status}
    </span>
  );
}
