import CampaignCard from "./campaines/CampaignCard";
import { campaigns } from "./campaines/campaigns";

export default function Messages() {
  const handleCampaign = (campaign) => {
    console.log(campaign);
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

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onClick={handleCampaign}
          />
        ))}
      </div>
    </div>
  );
}