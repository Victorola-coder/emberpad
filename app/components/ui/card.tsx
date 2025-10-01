export default function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-dark-800 rounded-[24px] p-5 shadow-lg border border-dark-700 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
