import {
  MdCake,
  MdCelebration,
  MdCardGiftcard,
  MdPeopleAlt,
  MdSchedule,
  MdSms,
} from "react-icons/md";

export const campaigns = [
  {
    id: 1,
    title: "کمپین تولد",
    description: "ارسال پیام تبریک همراه با کد تخفیف برای مشتریان.",
    icon: MdCake,
    color: "from-pink-500 to-rose-500",
    bg: "from-pink-50 to-rose-100",
  },
  {
    id: 2,
    title: "یادآوری نوبت",
    description: "ارسال خودکار پیامک قبل از زمان مراجعه مشتری.",
    icon: MdSchedule,
    color: "from-sky-500 to-cyan-500",
    bg: "from-sky-50 to-cyan-100",
  },
  {
    id: 3,
    title: "مشتریان غیرفعال",
    description: "دعوت دوباره مشتریانی که مدت زیادی مراجعه نکرده‌اند.",
    icon: MdPeopleAlt,
    color: "from-violet-500 to-fuchsia-500",
    bg: "from-violet-50 to-fuchsia-100",
  },
  {
    id: 4,
    title: "کمپین تخفیف",
    description: "اطلاع‌رسانی تخفیف‌های ویژه سالن.",
    icon: MdCardGiftcard,
    color: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-100",
  },
  {
    id: 5,
    title: "کمپین نوروز",
    description: "ارسال پیام مناسبتی ویژه نوروز.",
    icon: MdCelebration,
    color: "from-emerald-500 to-green-500",
    bg: "from-emerald-50 to-green-100",
  },
  {
    id: 6,
    title: "پیامک اختصاصی",
    description: "ارسال پیامک به گروه دلخواه از مشتریان.",
    icon: MdSms,
    color: "from-zinc-700 to-zinc-900",
    bg: "from-zinc-100 to-zinc-200",
  },
];