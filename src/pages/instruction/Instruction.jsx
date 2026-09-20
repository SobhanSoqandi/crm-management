
import React from "react";

const instructionItems = [
    {
        id: "register",
        title: "ثبت نام",
        description: "در این ویدئو نحوه ثبت نام و ایجاد حساب کاربری در پایدار را مشاهده می‌کنید.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "login",
        title: "ورود",
        description: "در این ویدئو نحوه ورود به حساب کاربری را مشاهده می‌کنید.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "appointment",
        title: "ثبت نوبت",
        description: "در این ویدئو نحوه ثبت نوبت جدید برای مشتری را مشاهده می‌کنید.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "wallet",
        title: "کیف پول",
        description: "در این ویدئو نحوه استفاده از کیف پول و مشاهده تراکنش‌ها را مشاهده می‌کنید.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "customers",
        title: "مشتریان و تاریخچه",
        description: "در این ویدئو نحوه مدیریت مشتریان و مشاهده سوابق آن‌ها را مشاهده می‌کنید.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
        id: "profile",
        title: "تکمیل پروفایل",
        description: "در این ویدئو نحوه تکمیل و ویرایش اطلاعات پروفایل را مشاهده می‌کنید.",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
];

function Instruction() {
    const scrollToSection = (id) => {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 pb-12">
            
            {/* Header */}
            <div className="sticky top-4 z-40 mb-8">
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg rounded-2xl p-3">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        {instructionItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => scrollToSection(item.id)}
                                className="
                                    shrink-0
                                    px-4
                                    py-2.5
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    text-slate-600
                                    bg-slate-50
                                    hover:bg-emerald-50
                                    hover:text-emerald-700
                                    active:scale-95
                                    transition-all
                                    duration-200
                                    whitespace-nowrap
                                "
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Page Title */}
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    آموزش استفاده از پایدار
                </h1>

                <p className="mt-3 text-sm sm:text-base text-slate-500">
                    برای یادگیری هر بخش، ویدئوی آموزشی مربوط به آن را مشاهده کنید.
                </p>
            </div>

            {/* Videos */}
            <div className="space-y-10">
                {instructionItems.map((item) => (
                    <section
                        key={item.id}
                        id={item.id}
                        className="scroll-mt-28"
                    >
                        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                            
                            {/* Video Header */}
                            <div className="p-5 sm:p-6 border-b border-slate-100">
                                <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                                    آموزش {item.title}
                                </h2>

                                <p className="mt-2 text-sm leading-7 text-slate-500">
                                    {item.description}
                                </p>
                            </div>

                            {/* Video */}
                            <div className="p-4 sm:p-6">
                                <div className="w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden">
                                    <video
                                        className="w-full h-full object-cover"
                                        controls
                                        preload="metadata"
                                    >
                                        <source
                                            src={item.video}
                                            type="video/mp4"
                                        />

                                        مرورگر شما از پخش ویدئو پشتیبانی نمی‌کند.
                                    </video>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Instruction;
