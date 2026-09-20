export function formatMoney(value) {
  return Number(value || 0).toLocaleString("fa-IR");
}

export function formatCompact(value) {
  return new Intl.NumberFormat("fa-IR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Number(value || 0));
}
