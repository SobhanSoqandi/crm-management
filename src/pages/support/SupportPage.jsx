// SupportPage.jsx
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi2";

const CHANNELS = [
  {
    id: "telegram",
    name: "تلگرام",
    description: "پاسخ‌گویی سریع در چت آنلاین",
    handle: "@yourbrand_support",
    href: "https://t.me/yourbrand_support",
    icon: FaTelegramPlane,
    iconWrap: "bg-sky-50 text-sky-600",
    button: "bg-sky-600 hover:bg-sky-700",
  },
  {
    id: "whatsapp",
    name: "واتساپ",
    description: "ارسال پیام یا تماس مستقیم",
    handle: "+98 912 000 0000",
    href: "https://wa.me/989120000000",
    icon: FaWhatsapp,
    iconWrap: "bg-emerald-50 text-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700",
  },
];

export default function SupportPage() {
  return (
      
    <div dir="rtl" className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          پشتیبانی
        </h2>
        <p className="text-sm text-gray-500">
          سوالی داری؟ از یکی از راه‌های زیر با ما در ارتباط باش
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center
                         hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${channel.iconWrap}`}
              >
                <Icon size={26} />
              </div>

              <h3 className="text-base font-semibold text-gray-900 mb-1">
                {channel.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {channel.description}
              </p>

              <span
                className={`w-full text-white text-sm font-medium rounded-xl py-2.5 transition-colors ${channel.button}`}
              >
                {channel.handle}
              </span>
            </a>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        <HiOutlineClock size={16} />
        <span>پاسخ‌گویی  همه روزه ,  ساعت ۹ تا ۱۸</span>
      </div>
    </div>
  );
}