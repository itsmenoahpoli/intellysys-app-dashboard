export default function StatusPill({ status }: { status: 'unused' | 'used' | 'revoked' }) {
  const getStyle = () => {
    switch (status) {
      case 'unused':
        return 'bg-success/15 text-success';
      case 'used':
        return 'bg-warning/15 text-warning';
      case 'revoked':
        return 'bg-danger/15 text-danger';
      default:
        return 'bg-white/10 text-white';
    }
  };

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide',
        getStyle(),
      ].join(' ')}
    >
      {label}
    </span>
  );
}
