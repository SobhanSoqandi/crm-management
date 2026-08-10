import { useRef, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";

export default function TagsInput({
    value = [],
    onChange,
    placeholder = "مقدار را وارد کنید",
    separatorKeys = ["Enter", ","],
    maxTags,
    disabled = false,
}) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const addTag = () => {
        const tag = inputValue.trim();

        if (!tag || disabled) return;

        if (maxTags && value.length >= maxTags) {
            setInputValue("");
            return;
        }

        const exists = value.some(
            (item) => item.trim().toLowerCase() === tag.toLowerCase()
        );

        if (exists) {
            setInputValue("");
            return;
        }

        onChange([...value, tag]);
        setInputValue("");
        inputRef.current?.focus();
    };

    const removeTag = (tagToRemove) => {
        if (disabled) return;

        onChange(
            value.filter((tag) => tag !== tagToRemove)
        );
    };

    const handleKeyDown = (event) => {
        if (separatorKeys.includes(event.key)) {
            event.preventDefault();
            addTag();
            return;
        }

        if (
            event.key === "Backspace" &&
            !inputValue &&
            value.length > 0
        ) {
            removeTag(value[value.length - 1]);
        }
    };

    return (
        <div
            dir="rtl"
            onClick={() => {
                if (!disabled) {
                    inputRef.current?.focus();
                }
            }}
            className={`flex min-h-14 w-full flex-wrap items-center gap-2 rounded-lg border bg-white px-3 py-2 transition ${
                disabled
                    ? "cursor-not-allowed border-slate-200 bg-slate-50"
                    : "cursor-text border-slate-300 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
            }`}
        >
            {value.map((tag) => (
                <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-sm font-medium text-blue-700"
                >
                    <span>{tag}</span>

                    <button
                        type="button"
                        disabled={disabled}
                        onClick={(event) => {
                            event.stopPropagation();
                            removeTag(tag);
                        }}
                        className="flex h-4 w-4 items-center justify-center rounded-full text-blue-500 transition hover:bg-blue-100 hover:text-blue-700 disabled:cursor-not-allowed"
                        aria-label={`حذف ${tag}`}
                    >
                        <HiOutlineXMark className="text-base" />
                    </button>
                </span>
            ))}

            {(!maxTags || value.length < maxTags) && (
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    disabled={disabled}
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                        value.length === 0
                            ? placeholder
                            : "مقدار دیگری وارد کنید"
                    }
                    className="min-w-35 flex-1 border-0 bg-transparent py-1 text-sm text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
                />
            )}
        </div>
    );
}