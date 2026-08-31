import CampaignCard from "./campaines/CampaignCard";
import { campaigns } from "./campaines/campaigns";
import { Sparkles } from "lucide-react";

export default function Messages() {
  const handleCampaign = (campaign) => {
    // بعداً اینجا Modal یا Navigate
  };

  return (
    <div className="space-y-8 px-2">
      <div>
        <span className="text-sm font-medium text-zinc-500">
          بازاریابی پیامکی
        </span>

        <h1 className="mt-2 text-3xl font-black text-zinc-900">
          کمپین‌های پیامکی
        </h1>

        <p className="mt-3 max-w-2xl leading-8 text-zinc-500">
          با انتخاب هر کمپین، پیامک‌های هدفمند برای مشتریان ارسال کنید.
        </p>
      </div>

      {/* --- Coming Soon Wrapper --- */}
      <div className="relative">
        {/* محتوای تار و غیرفعال */}
        <div
          className="grid grid-cols-1 gap-5 pointer-events-none select-none blur-[1px] md:grid-cols-2 xl:grid-cols-3"
          aria-hidden="true"
        >
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onClick={handleCampaign}
            />
          ))}
        </div>

        {/* لایه‌ی Overlay روی محتوا */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/40 backdrop-blur-[2px]">
          <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-bold text-zinc-800">
              به زودی...
            </span>
          </div>
          <p className="max-w-xs text-center text-sm leading-6 text-zinc-900">
            این بخش در حال آماده‌سازی است و در آپدیت‌های بعدی فعال می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}