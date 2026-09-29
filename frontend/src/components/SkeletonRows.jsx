export default function SkeletonRows({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-row" style={{ animationDelay: `${i * 0.08}s` }}>
          <div className="skeleton-cell skeleton-priority" />
          <div className="skeleton-cell skeleton-title" />
          <div className="skeleton-cell skeleton-status" />
          <div className="skeleton-cell skeleton-date" />
          <div className="skeleton-cell skeleton-actions" />
        </div>
      ))}
    </>
  );
}
