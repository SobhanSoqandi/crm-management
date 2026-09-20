import { useState } from "react";
import { FaChartPie } from "react-icons/fa";
import {
  HiArrowLeft,
  HiArrowDown,
  HiCheckCircle,
  HiUserGroup,
  HiCalendarDays,
  HiWallet,
  HiChartBar,
  HiChatBubbleLeftRight,
  HiSparkles,
  HiArrowTrendingUp,
  HiChevronDown,
  HiPlay,
} from "react-icons/hi2";

function Landing() {
  const [openFaq, setOpenFaq] = useState(null);

  const features = [
    {
      icon: HiUserGroup,
      title: "مدیریت مشتری‌ها",
      text: "اطلاعات، سوابق مراجعه و خدمات مشتری‌ها را یکجا داشته باش و مشتری‌هایت را بهتر بشناس.",
      color: "emerald",
    },
    {
      icon: HiCalendarDays,
      title: "مدیریت نوبت‌ها",
      text: "نوبت‌های سالن را با تاریخ، ساعت، خدمات و اطلاعات مشتری منظم و دقیق ثبت و مدیریت کن.",
      color: "turquoise",
    },
    {
      icon: HiWallet,
      title: "کیف پول و بازگشت وجه",
      text: "بخشی از مبلغ پرداختی مشتری را به کیف پول او برگردان تا برای مراجعه بعدی انگیزه داشته باشد.",
      color: "gold",
    },
    {
      icon: HiChartBar,
      title: "گزارش و آمار",
      text: "درآمد روزانه، هفتگی و ماهانه و وضعیت مشتری‌های برگشتی را در یک نگاه ببین.",
      color: "emerald",
    },
    {
      icon: HiChatBubbleLeftRight,
      title: "کمپین پیامکی",
      text: "برای مناسبت‌ها و بازگرداندن مشتری‌های قدیمی، کمپین‌های پیامکی هدفمند ایجاد کن.",
      color: "turquoise",
    },
    {
      icon: HiSparkles,
      title: "وفادارسازی مشتری",
      text: "با بازگشت وجه و سیستم معرفی، ارتباط مشتری با سالن را بعد از هر مراجعه ادامه بده.",
      color: "gold",
    },
  ];

  const faqs = [
    {
      question: "پایدار دقیقاً چیست؟",
      answer:
        "پایدار یک CRM تخصصی برای سالن‌های زیبایی و لیزر است که به شما کمک می‌کند مشتری‌ها، سوابق، نوبت‌ها، پرداخت‌ها، وفاداری و وضعیت کسب‌وکارتان را منظم مدیریت کنید.",
    },
    {
      question: "آیا پایدار سیستم رزرو آنلاین است؟",
      answer:
        "تمرکز فعلی پایدار روی مدیریت مشتری و نوبت‌های سالن است. نوبت می‌تواند توسط سالن ثبت شود و اطلاعاتی مثل تاریخ، ساعت، خدمات و مشتری در سیستم ذخیره شود.",
    },
    {
      question: "بازگشت وجه در پایدار چگونه کار می‌کند؟",
      answer:
        "سالن می‌تواند درصدی از مبلغ پرداختی را برای مشتری در نظر بگیرد. این مبلغ به کیف پول مشتری برمی‌گردد و مشتری می‌تواند در مراجعه بعدی از اعتبار خود استفاده کند.",
    },
    {
      question: "آیا سوابق مشتری‌ها ذخیره می‌شود؟",
      answer:
        "بله. اطلاعات مشتری و سوابق مراجعه و خدمات او در سیستم ثبت می‌شود تا سالن بتواند شناخت دقیق‌تری از مشتری‌های خود داشته باشد.",
    },
    {
      question: "پایدار برای چه کسب‌وکارهایی مناسب است؟",
      answer:
        "نسخه فعلی پایدار با تمرکز روی سالن‌های زیبایی، آرایشگاه‌ها و سالن‌های لیزر طراحی شده است.",
    },
    {
      question: "آیا می‌توانم برای مشتری‌ها پیامک ارسال کنم؟",
      answer:
        "بله. پایدار برای کمپین‌های پیامکی مانند تبریک تولد، مناسبت‌ها و کمپین‌های بازگشت مشتری طراحی شده است.",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#fffdf8] text-[#12372d]"
    >
      

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d9a928]/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
      
           <div className="flex items-center">
            <img
              src="/images/logo-2.png"
              alt="پایدار"
              className="h-11 w-auto object-contain"
            />
          </div>

          
          

          <nav className="hidden items-center gap-8 text-sm font-medium text-[#55736a] md:flex">
            <a href="#features" className="transition hover:text-[#00a3a3]">
              امکانات
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-[#00a3a3]"
            >
              نحوه کار
            </a>

            <a href="#dashboard" className="transition hover:text-[#00a3a3]">
              محیط پایدار
            </a>

            <a href="#faq" className="transition hover:text-[#00a3a3]">
              سوالات متداول
            </a>
          </nav>

          <a
            href="/register"
            className="flex items-center gap-2 rounded-xl bg-[#00a3a3] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-100 transition hover:-translate-y-0.5 hover:bg-[#008b8b]"
          >
            شروع کنید
            <HiArrowLeft />
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden px-5 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
        <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-[#48d8d8]/20 blur-[110px]" />

        <div className="absolute -left-40 top-48 h-[450px] w-[450px] rounded-full bg-[#f4cf65]/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d7ad36]/25 bg-[#fff8df] px-4 py-2 text-xs font-bold text-[#a77a05]">
              <HiSparkles />
              CRM تخصصی سالن‌های زیبایی
            </div>

            <h1 className="max-w-2xl text-5xl font-black leading-[1.25] tracking-tight text-[#12372d] sm:text-6xl lg:text-7xl">
              مشتری‌هاتو
              <span className="block bg-gradient-to-l from-[#d5a526] via-[#e3bd4f] to-[#00a3a3] bg-clip-text text-transparent">
                پایدار کن.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-9 text-[#617970] sm:text-xl">
              پایدار به سالن‌های زیبایی و لیزر کمک می‌کند مشتری‌ها را بهتر
              بشناسند، مراجعه‌ها را مدیریت کنند و با وفادارسازی، مشتری را برای
              مراجعه بعدی برگردانند.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/register"
                className="flex items-center justify-center gap-3 rounded-2xl bg-[#00a3a3] px-7 py-4 font-black text-white shadow-xl shadow-cyan-100 transition hover:-translate-y-1 hover:bg-[#008b8b]"
              >
                شروع استفاده از پایدار
                <HiArrowLeft />
              </a>

              <a
                href="#how-it-works"
                className="flex items-center justify-center gap-3 rounded-2xl border border-[#d8e6e0] bg-white px-7 py-4 font-bold text-[#31554b] shadow-sm transition hover:border-[#9bcfc0] hover:bg-[#f8fffc]"
              >
                <HiPlay className="text-[#00a3a3]" />
                پایدار چطور کار می‌کند؟
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#789088]">
              <span className="flex items-center gap-2">
                <HiCheckCircle className="text-[#00a3a3]" />
                مدیریت مشتری
              </span>

              <span className="flex items-center gap-2">
                <HiCheckCircle className="text-[#00a3a3]" />
                کیف پول مشتری
              </span>

              <span className="flex items-center gap-2">
                <HiCheckCircle className="text-[#00a3a3]" />
                گزارش درآمد
              </span>
            </div>
          </div>

          {/* ================= HERO DASHBOARD ================= */}

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-10 rounded-[60px] bg-gradient-to-br from-[#4bd8d8]/20 via-[#f3d36b]/10 to-transparent blur-3xl" />

            <div className="relative rounded-[30px] border border-[#dfeae5] bg-white p-2.5 shadow-[0_30px_80px_rgba(30,90,72,0.12)] sm:p-3">
              <div className="overflow-hidden rounded-[23px] border border-[#edf1ef] bg-[#f7faf8]">
                <div className="flex h-12 items-center justify-between border-b bg-white px-4">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#009b5d]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff0073]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#0084ff]" />
                  </div>

                  <span className="text-xs font-black text-[#23483c]">
                    داشبورد پایدار
                  </span>
                </div>

                <div className="grid min-h-[360px] grid-cols-[82px_1fr] sm:min-h-[390px] sm:grid-cols-[1fr_3fr]">
                  <div className="border-l bg-[#eff8f4] p-2.5 sm:p-4">
                    <div className="mb-8 flex items-center justify-center gap-2 sm:justify-start">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#ffffff] shadow">
                        <FaChartPie className="text-[#00a3a3]" />
                      </div>

                      <span className="hidden text-xs font-black text-[#174235] sm:block">
                       پایدار سیستم 
                      </span>
                    </div>

                    <div className="space-y-2 text-[10px]">
                      <div className="rounded-lg bg-white px-2 py-2 text-center font-bold text-[#00a3a3] shadow-sm sm:px-3 sm:text-right">
                        داشبورد
                      </div>

                      <div className="px-2 py-2 text-center text-[#8ba39b] sm:px-3 sm:text-right">
                        مشتری‌ها
                      </div>

                      <div className="px-2 py-2 text-center text-[#8ba39b] sm:px-3 sm:text-right">
                        نوبت‌ها
                      </div>

                      <div className="px-2 py-2 text-center text-[#8ba39b] sm:px-3 sm:text-right">
                        کیف پول
                      </div>

                      <div className="px-2 py-2 text-center text-[#8ba39b] sm:px-3 sm:text-right">
                        گزارش‌ها
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#f8faf9] p-3 sm:p-5">
                    <div className="mb-5">
                      <div className="text-sm font-black text-[#193d31]">
                        خلاصه عملکرد
                      </div>

                      <div className="mt-1 text-[9px] text-[#9bada6]">
                        نمای کلی سالن شما
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                      {[
                        ["درآمد این ماه", "۸۴.۵ م"],
                        ["مشتری‌ها", "۳۲۴"],
                        ["مشتری برگشتی", "۷۸٪"],
                      ].map(([title, value]) => (
                        <div
                          key={title}
                          className="rounded-xl border border-[#edf2ef] bg-white p-3 shadow-sm"
                        >
                          <div className="text-[8px] text-[#9aaba5]">
                            {title}
                          </div>

                          <div className="mt-2 text-sm font-black text-[#15372d]">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 rounded-xl border border-[#edf2ef] bg-white p-3 shadow-sm sm:p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-[#9aaba5]">
                          روند درآمد
                        </span>

                        <span className="flex items-center gap-1 text-[8px] font-bold text-[#00a3a3]">
                          <HiArrowTrendingUp />
                          رشد
                        </span>
                      </div>

                      <div className="mt-5 flex h-24 items-end gap-1.5 sm:h-28 sm:gap-2">
                        {[35, 48, 42, 64, 56, 77, 91, 70, 86, 96].map(
                          (height, index) => (
                            <div
                              key={index}
                              className="flex-1 rounded-t-md bg-gradient-to-t from-[#00a3a3] to-[#4ed9d9]"
                              style={{ height: `${height}%` }}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2 sm:gap-3">
                      <div className="rounded-xl border border-[#edf2ef] bg-white p-3 shadow-sm">
                        <div className="text-[8px] text-[#9aaba5]">
                          نوبت‌های امروز
                        </div>

                        <div className="mt-2 text-lg font-black text-[#15372d]">
                          ۲۴
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#edf2ef] bg-white p-3 shadow-sm">
                        <div className="text-[8px] text-[#9aaba5]">
                          موجودی کیف پول
                        </div>

                        <div className="mt-2 text-lg font-black text-[#15372d]">
                          ۱۲.۸ م
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-7 -left-5 hidden w-52 rounded-2xl border border-[#dfeae5] bg-white p-4 shadow-[0_20px_50px_rgba(30,90,72,0.15)] sm:block">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#8ca099]">
                    کیف پول مشتری
                  </div>

                  <div className="mt-1 text-sm font-black text-[#00a3a3]">
                    + ۲۵۰,۰۰۰ تومان
                  </div>
                </div>

                <div className="rounded-xl bg-[#fff6d8] p-2 text-[#c49720]">
                  <HiWallet />
                </div>
              </div>

              <div className="mt-3 text-[9px] text-[#9baaa5]">
                اعتبار برگشتی برای مراجعه بعدی
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-14 flex justify-center">
          <a
            href="#problem"
            className="flex animate-bounce items-center gap-2 text-xs text-[#91a39c]"
          >
            بیشتر ببین
            <HiArrowDown />
          </a>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}

      <section
        id="problem"
        className="border-y border-[#e6efeb] bg-[#f4fbf8] px-5 py-24 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-sm font-black text-[#00a3a3]">
              مشکل از کجاست؟
            </span>

            <h2 className="mt-4 text-3xl font-black leading-[1.5] text-[#12372d] sm:text-4xl lg:text-5xl">
              مشتری‌ها می‌آیند...
              <br />
              اما آیا دوباره برمی‌گردند؟
            </h2>

            <p className="mt-6 leading-8 text-[#71877f]">
              داشتن مشتری فقط شروع ماجراست. وقتی اطلاعات مشتری، سوابق مراجعه
              و ارتباط با او مدیریت نشود، فرصت بازگشت مشتری به‌سادگی از دست
              می‌رود.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [
                "۱",
                "اطلاعات پراکنده",
                "شماره و اطلاعات مشتری‌ها را سخت پیدا می‌کنی.",
              ],
              [
                "۲",
                "سوابق فراموش می‌شوند",
                "نمی‌دانی مشتری قبلاً چه خدمتی گرفته است.",
              ],
              [
                "۳",
                "مشتری برنمی‌گردد",
                "بعد از مراجعه، ارتباط با مشتری قطع می‌شود.",
              ],
              [
                "۴",
                "تصویر واضحی نداری",
                "نمی‌دانی وضعیت درآمد و مشتری‌هایت چطور است.",
              ],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="group rounded-3xl border border-[#e2eee9] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#7acdd8]"
              >
                <div className="text-2xl font-black text-[#d1a329]">
                  {number}
                </div>

                <h3 className="mt-5 text-lg font-black text-[#183f33]">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#82958e]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SOLUTION ================= */}

      <section className="relative px-5 py-28 lg:px-8">
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-[#58d8d8]/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-sm font-black text-[#00a3a3]">
              راه‌حل پایدار
            </span>

            <h2 className="mt-4 text-3xl font-black leading-[1.5] text-[#12372d] sm:text-4xl lg:text-5xl">
              مشتری فقط یک
              <span className="text-[#d0a126]"> شماره تلفن </span>
              نیست.
            </h2>

            <p className="mt-6 max-w-xl leading-9 text-[#71877f]">
              پایدار اطلاعات مشتری را به یک ارتباط قابل مدیریت تبدیل می‌کند.
              از اولین مراجعه تا پرداخت، سابقه خدمات، اعتبار کیف پول و
              بازگشت دوباره مشتری.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "شناخت بهتر مشتری‌ها",
                "مدیریت منظم مراجعه‌ها",
                "ایجاد انگیزه برای مراجعه مجدد",
                "مشاهده وضعیت درآمد و مشتری‌ها",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-[#527067]"
                >
                  <HiCheckCircle className="text-[#00a3a3]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[32px] border border-[#dfebe6] bg-white p-6 shadow-[0_25px_70px_rgba(30,90,72,0.09)] sm:p-8">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#98aaa4]">
                    Customer Profile
                  </div>

                  <div className="mt-1 font-black text-[#173d31]">
                    سارا احمدی
                  </div>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e5f7f7] font-black text-[#00a3a3]">
                  س
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  ["آخرین مراجعه", "۲۴ شهریور"],
                  ["تعداد مراجعه", "۱۲ بار"],
                  ["اعتبار کیف پول", "۳۵۰,۰۰۰ تومان"],
                  ["خدمت اخیر", "رنگ مو"],
                ].map(([title, value]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-[#edf2ef] bg-[#fbfdfc] p-4"
                  >
                    <div className="text-[10px] text-[#9aa9a4]">{title}</div>

                    <div
                      className={`mt-2 text-sm font-black ${
                        title === "اعتبار کیف پول"
                          ? "text-[#c29418]"
                          : "text-[#173d31]"
                      }`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-[#f2df9f] bg-[#fffbeb] p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-[#f7e8ae] p-3 text-[#b78915]">
                    <HiSparkles />
                  </div>

                  <div>
                    <div className="text-xs font-black text-[#604c18]">
                      مشتری وفادار
                    </div>

                    <div className="mt-1 text-[10px] text-[#9a8958]">
                      این مشتری ۱۲ بار به سالن مراجعه کرده است.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="bg-[#f4fbf8] px-5 py-28 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-black text-[#00a3a3]">
              امکانات پایدار
            </span>

            <h2 className="mt-4 text-3xl font-black text-[#12372d] sm:text-4xl lg:text-5xl">
              همه چیز برای شناخت
              <span className="text-[#d0a126]"> مشتری</span>
            </h2>

            <p className="mt-6 leading-8 text-[#71877f]">
              ابزارهایی که کنار هم قرار گرفته‌اند تا مدیریت مشتری و رشد سالن
              ساده‌تر شود.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              const iconClass =
                feature.color === "gold"
                  ? "bg-[#fff6d8] text-[#c39419] group-hover:bg-[#d9ad38] group-hover:text-white"
                  : feature.color === "turquoise"
                  ? "bg-[#e4fbfb] text-[#079b9b] group-hover:bg-[#18bcbc] group-hover:text-white"
                  : "bg-[#e4f7f7] text-[#00a3a3] group-hover:bg-[#00a3a3] group-hover:text-white";

              return (
                <div
                  key={feature.title}
                  className="group rounded-[28px] border border-[#e0ece7] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-100/50"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition ${iconClass}`}
                  >
                    <Icon />
                  </div>

                  <h3 className="mt-7 text-xl font-black text-[#183f33]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-8 text-[#7b9089]">
                    {feature.text}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-bold text-[#00a3a3]">
                    بیشتر بدانید
                    <HiArrowLeft />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= بازگشت وجه ================= */}

      <section
        id="how-it-works"
        className="relative overflow-hidden px-5 py-28 lg:px-8"
      >
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#50dada]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-sm font-black text-[#00a3a3]">
              وفادارسازی با پایدار
            </span>

            <h2 className="mt-4 text-3xl font-black leading-[1.5] text-[#12372d] sm:text-4xl lg:text-5xl">
              یک مراجعه،
              <br />
              <span className="text-[#d0a126]">شروع مراجعه بعدی.</span>
            </h2>

            <p className="mt-6 leading-8 text-[#71877f]">
              با بازگشت وجه، بخشی از مبلغ پرداختی مشتری می‌تواند طبق تنظیمات
              سالن به کیف پول او برگردد و برای مراجعه بعدی استفاده شود.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-4">
            {[
              [
                HiCalendarDays,
                "مراجعه",
                "مشتری برای دریافت خدمت به سالن می‌آید.",
              ],
              [
                HiWallet,
                "پرداخت",
                "مبلغ نهایی خدمت در سیستم ثبت می‌شود.",
              ],
              [
                HiSparkles,
                "بازگشت وجه",
                "بخشی از مبلغ طبق تنظیم سالن برمی‌گردد.",
              ],
              [
                HiArrowTrendingUp,
                "مراجعه بعدی",
                "مشتری برای استفاده از اعتبار برمی‌گردد.",
              ],
            ].map(([Icon, title, text], index) => (
              <div key={title} className="relative">
                <div className="rounded-3xl border border-[#e0ece7] bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="text-2xl font-black text-[#00a3a3]">
                      {index + 1}
                    </span>

                    <div className="rounded-xl bg-[#e9f8f8] p-3 text-2xl text-[#00a3a3]">
                      <Icon />
                    </div>
                  </div>

                  <h3 className="font-black text-[#183f33]">{title}</h3>

                  <p className="mt-3 text-xs leading-7 text-[#81948d]">
                    {text}
                  </p>
                </div>

                {/* {index < 3 && (
                  <HiArrowLeft className="absolute text-4xl -left-4 top-1/2 z-10 hidden -translate-y-1/2 text-[#00a3a3] md:block" />
                )} */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= DASHBOARD ================= */}

      <section
        id="dashboard"
        className="bg-[#f4fbf8] px-5 py-28 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-sm font-black text-[#00a3a3]">
                همه چیز جلوی چشم تو
              </span>

              <h2 className="mt-4 text-3xl font-black leading-[1.5] text-[#12372d] sm:text-4xl">
                سالن را با
                <span className="text-[#d0a126]"> عدد و آمار </span>
                ببین.
              </h2>

              <p className="mt-6 leading-8 text-[#71877f]">
                اطلاعات مهم کسب‌وکارت را یکجا ببین و بدون پیچیدگی وضعیت درآمد
                و مشتری‌هایت را بررسی کن.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "درآمد روزانه، هفتگی و ماهانه",
                  "روند تغییر درآمد",
                  "تعداد مشتری‌ها",
                  "مشتری‌های برگشتی",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-[#527067]"
                  >
                    <HiCheckCircle className="text-[#00a3a3]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[#dfeae5] bg-white p-3 shadow-[0_30px_70px_rgba(30,90,72,0.10)]">
              <div className="rounded-[22px] bg-[#fbfdfc] p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-[#173d31]">
                      گزارش درآمد
                    </div>

                    <div className="mt-1 text-[9px] text-[#9aa9a4]">
                      شهریور ۱۴۰۵
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#e8f7f7] px-3 py-2 text-[9px] font-bold text-[#00a3a3]">
                    این ماه
                  </div>
                </div>

                <div className="mt-7 text-2xl font-black text-[#173d31] sm:text-3xl">
                  ۸۴,۵۰۰,۰۰۰
                </div>

                <div className="mt-2 text-[10px] text-[#9aa9a4]">
                  تومان
                </div>

                <div className="mt-8 flex h-40 items-end gap-1.5 sm:h-48 sm:gap-2">
                  {[30, 43, 38, 55, 49, 67, 61, 75, 70, 84, 78, 94].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex h-full flex-1 items-end"
                      >
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-[#00a3a3] to-[#4fd9d9]"
                          style={{ height: `${height}%` }}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="mt-3 flex justify-between text-[8px] text-[#9aa9a4]">
                  <span>۱ شهریور</span>
                  <span>۱۵ شهریور</span>
                  <span>۳۰ شهریور</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= AUDIENCE ================= */}

      <section className="px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-sm font-black text-[#00a3a3]">
              برای چه کسانی؟
            </span>

            <h2 className="mt-4 text-3xl font-black text-[#12372d] sm:text-4xl">
              ساخته شده برای کسب‌وکارهای زیبایی
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["سالن زیبایی", "مدیریت مشتری و مراجعه‌های سالن"],
              ["سالن لیزر", "ثبت سوابق و حفظ ارتباط با مشتری"],
              ["آرایشگاه", "مدیریت مشتری‌های وفادار"],
              ["مجموعه زیبایی", "یک نگاه منظم به عملکرد مجموعه"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="group rounded-3xl border border-[#e0ece7] bg-white p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e6f8f8] to-[#fff7dc] text-2xl text-[#00a3a3]">
                  <HiSparkles />
                </div>

                <h3 className="mt-6 font-black text-[#183f33]">{title}</h3>

                <p className="mt-3 text-xs leading-7 text-[#82958e]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY ================= */}

      <section className="bg-[#f4fbf8] px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <span className="text-sm font-black text-[#00a3a3]">
            فلسفه پایدار
          </span>

          <h2 className="mt-5 text-3xl font-black leading-[1.6] text-[#12372d] sm:text-4xl lg:text-5xl">
            هدف فقط ثبت اطلاعات نیست.
            <br />
            <span className="text-[#d0a126]">هدف، برگشتن مشتری است.</span>
          </h2>

          <p className="mx-auto mt-7 max-w-2xl leading-9 text-[#71877f]">
            پایدار مجموعه‌ای از ابزارهای مدیریت مشتری، نوبت، کیف پول،
            وفادارسازی، پیامک و گزارش را کنار هم قرار می‌دهد تا رابطه سالن با
            مشتری بعد از هر مراجعه ادامه داشته باشد.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-4">
            {[
              ["مشتری", "بهتر بشناس"],
              ["مراجعه", "منظم‌تر کن"],
              ["وفاداری", "ایجاد کن"],
              ["رشد", "اندازه بگیر"],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-2xl border border-[#e0ece7] bg-white px-4 py-6 shadow-sm"
              >
                <div className="text-lg font-black text-[#00a3a3]">
                  {title}
                </div>

                <div className="mt-2 text-xs text-[#82958e]">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section id="faq" className="px-5 py-28 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-black text-[#00a3a3]">
              سوالات متداول
            </span>

            <h2 className="mt-4 text-3xl font-black text-[#12372d] sm:text-4xl">
              سوالی داری؟
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-[#e0ece7] bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-right"
                  >
                    <span className="font-bold text-[#274b40]">
                      {faq.question}
                    </span>

                    <HiChevronDown
                      className={`shrink-0 text-[#00a3a3] transition ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#edf2ef] px-6 py-5 text-sm leading-8 text-[#788d85]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className="px-5 pb-20 pt-10 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-gradient-to-br from-[#008b8b] via-[#00a3a3] to-[#21bebe] px-6 py-20 text-center shadow-2xl shadow-cyan-100 sm:px-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#f5d56c]/20 blur-3xl" />

          <div className="relative">
            <span className="text-sm font-bold text-[#fff0b5]">
              آماده‌ای؟
            </span>

            <h2 className="mt-5 text-3xl font-black leading-[1.5] text-white sm:text-4xl lg:text-5xl">
              مشتری فقط یک بار
              <br />
              به سالن تو نیاد.
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-8 text-white/75">
              با پایدار، مشتری‌ها را بهتر بشناس، ارتباطت را حفظ کن و برای
              مراجعه بعدی آماده باش.
            </p>

            <a
              href="/register"
              className="mx-auto mt-9 flex w-fit items-center gap-3 rounded-2xl bg-white px-8 py-4 font-black text-[#008b8b] shadow-xl transition hover:-translate-y-1"
            >
              شروع استفاده از پایدار
              <HiArrowLeft />
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#e3ece8] bg-white px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <img
              src="/images/logo-2.png"
              alt="پایدار"
              className="h-11 w-auto object-contain"
            />
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-[#81938d]">
            <a href="#features" className="transition hover:text-[#00a3a3]">
              امکانات
            </a>

            <a
              href="#how-it-works"
              className="transition hover:text-[#00a3a3]"
            >
              نحوه کار
            </a>

            <a href="#faq" className="transition hover:text-[#00a3a3]">
              سوالات متداول
            </a>
          </div>

          <div className="text-xs text-[#a2afab]">
            © {new Date().getFullYear()} Paydar
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;