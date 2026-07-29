import React from "react";
import WalletCard from "./WalletCard";

export default function WalletStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {stats.map((item) => (
        <WalletCard key={item.id} {...item} />
      ))}
    </div>
  );
}