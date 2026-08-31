import { formatnumber } from "../../Utils/ToPersianNumber";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

function Pagination({ currentPage, totalPages, total, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-4 px-2">
      <span className="text-sm text-slate-400">
        {formatnumber.digits(total)} نوبت
      </span>

      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-2 rounded-lg border border-slate-200 disabled:opacity-40"
        >
          <HiChevronRight className="text-lg" />
        </button>

        <span className="text-sm text-slate-600">
          {formatnumber.digits(currentPage)} از {formatnumber.digits(totalPages)}
        </span>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-2 rounded-lg border border-slate-200 disabled:opacity-40"
        >
          <HiChevronLeft className="text-lg" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;