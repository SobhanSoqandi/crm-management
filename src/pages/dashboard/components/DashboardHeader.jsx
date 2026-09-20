
import { useState } from "react";
import { Sparkles } from "lucide-react";
import {
  FiCopy,
  FiCheck,
  FiLink,
  FiAlertCircle,
} from "react-icons/fi";
import useSalon from "../../../hooks/useSalon";

function DashboardHeader({ salonName }) {
  const { salon, isSalonLoading } = useSalon();
  const [copied, setCopied] = useState(false);

  const today = new Date().toLocaleDateString("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const salonId = salon?.data?.id;
  const registerLink = salonId
    ? `https://paydarsystem.ir/register/${salonId}`
    : "";

  const handleCopy = async () => {
    if (!registerLink) return;

    await navigator.clipboard.writeText(registerLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 20000);
  };

  return (
    <header className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-fuchsia-700 via-purple-800 to-slate-800 p-5 text-white shadow-lg md:p-7">
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-400/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/3 h-52 w-52 rounded-full bg-rose-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-extrabold md:text-3xl">
              داشبورد
            </h1>

            <p className="mt-2 text-sm text-fuchsia-100/80 md:text-base">
              نمای کلی عملکرد سالن {salonName}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-fuchsia-50 shadow-sm backdrop-blur-md md:self-auto">
            <Sparkles size={16} />
            <span>{today}</span>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 shadow-sm backdrop-blur">
                <FiLink size={19} />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white md:text-base">
                  لینک ثبت‌نام مشتریان
                </h3>

                <p className="mt-1 text-[11px] text-fuchsia-100/65 md:text-xs">
                  لینک اختصاصی سالن را با مشتریان خود به اشتراک بگذارید
                </p>
              </div>
            </div>

            <div className="w-full lg:max-w-xl">
              {isSalonLoading ? (
                <div className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-xs text-white/60 backdrop-blur">
                  در حال دریافت اطلاعات سالن...
                </div>
              ) : !salonId ? (
                <div className="flex items-center gap-2 rounded-xl border border-red-300/20 bg-red-400/10 px-3 py-2.5 text-xs text-red-100">
                  <FiAlertCircle size={17} />
                  <span>
                    شما صاحب سالن نیستید و لینک ثبت‌نام در دسترس نیست.
                  </span>
                </div>
              ) : (
                <div
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 p-1.5 shadow-inner backdrop-blur-md"
                  dir="ltr"
                >
                  <input
                    value={registerLink}
                    readOnly
                    className="min-w-0 flex-1 bg-transparent px-2 text-xs text-white outline-none sm:text-sm"
                  />

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all sm:h-10 sm:px-4 sm:text-sm ${
                      copied
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-purple-800 hover:bg-fuchsia-50"
                    }`}
                  >
                    {copied ? (
                      <>
                        <FiCheck size={17} />
                        کپی شد
                      </>
                    ) : (
                      <>
                        <FiCopy size={17} />
                        کپی لینک
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {salonId && !isSalonLoading && (
            <div className="mt-3 flex items-start gap-2 pr-1 text-[10px] leading-5 text-fuchsia-100/55 sm:text-xs">
              <FiLink className="mt-1 shrink-0" size={12} />
              <p>
                این لینک را برای مشتریان خود ارسال کنید تا ثبت‌نام آن‌ها
                به‌صورت خودکار به سالن شما متصل شود.
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;

