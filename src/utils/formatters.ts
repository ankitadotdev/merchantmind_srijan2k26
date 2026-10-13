export function formatINR(
  amount: number,
  options?: { showSign?: boolean; compact?: boolean }
): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);

  let formatted = '';
  if (options?.compact && abs >= 10000000) {
    formatted = `${(abs / 10000000).toFixed(2)} Cr`;
  } else if (options?.compact && abs >= 100000) {
    formatted = `${(abs / 100000).toFixed(1)} L`;
  } else if (options?.compact && abs >= 1000) {
    formatted = `${(abs / 1000).toFixed(1)}k`;
  } else {
    formatted = abs.toLocaleString('en-IN');
  }

  if (isNegative) {
    return `-₹${formatted}`;
  }
  if (options?.showSign && amount > 0) {
    return `+₹${formatted}`;
  }
  return `₹${formatted}`;
}

export function formatDate(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string): string {
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return dateString;
  }
}
