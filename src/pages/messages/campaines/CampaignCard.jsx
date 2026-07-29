import { HiArrowLongLeft } from "react-icons/hi2";

export default function CampaignCard({ campaign, onClick }) {
  const Icon = campaign.icon;

  return (
    <button
      onClick={() => onClick?.(campaign)}
      className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-2xl"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${campaign.bg} opacity-100 md:opacity-0 transition duration-500 group-hover:opacity-200`}
      />

      <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/70 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${campaign.color} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-6`}
          >
            <Icon size={30} />
          </div>

          <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-500 backdrop-blur">
            کمپین
          </span>
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-extrabold text-zinc-900">
            {campaign.title}
          </h2>

          <p className="mt-2 text-sm leading-7 text-zinc-600">
            {campaign.description}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-4">
          <span className="text-sm font-semibold text-zinc-500 transition group-hover:text-black">
            شروع کمپین
          </span>

          <div className="flex h-10 w-10 items-center border border-gray-200 justify-center rounded-xl bg-white transition duration-300 group-hover:bg-blue-500 group-hover:text-white">
            <HiArrowLongLeft className="text-xl transition-transform group-hover:-translate-x-1" />
          </div>
        </div>
      </div>
    </button>
  );
}