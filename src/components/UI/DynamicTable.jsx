import { Fragment } from "react";

const DynamicTable = ({ columns, data, keyField = "id" }) => {
    if (!data?.length) {
        return "داده‌ای وجود ندارد";
    }

    const actionColumns = columns.filter((c) => !c.field && c.render);
    const dataColumns = columns.filter((c) => c.field);
    const [titleColumn, ...restColumns] = dataColumns;

    return (
        <div className="w-full">
            {/* حالت جدول - دسکتاپ و تبلت */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-right">
                    <thead>
                        <tr className="border-b border-gray-200">
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    style={{ width: col.width }}
                                    className="px-4 py-3 font-semibold text-gray-600"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row) => (
                            <tr
                                key={row[keyField]}
                                className={
                                    row.isDeleted
                                        ? "bg-gray-100 text-gray-400 opacity-70"
                                        : "border-b border-gray-100"
                                }
                            >
                                {columns.map((col, idx) => (
                                    <td
                                        key={idx}
                                        className="px-4 py-4"
                                    >
                                        {col.render
                                            ? col.render(row[col.field], row)
                                            : row[col.field]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* حالت کارتی - موبایل */}
            <div className="md:hidden flex flex-col gap-3">
                {data.map((row) => (
                    <div
                        key={row[keyField]}
                        className={
                            row.isDeleted
                                ? "rounded-2xl border border-gray-300 bg-gray-100 shadow-sm p-4 opacity-70"
                                : "rounded-2xl border border-gray-200 bg-white shadow-sm p-4"
                        }
                    >
                        {/* وضعیت حذف */}
                        {row.isDeleted && (
                            <div className="mb-3 flex items-center justify-between">
                                <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-md">
                                    این نوبت حذف شده است
                                </span>
                            </div>
                        )}

                        {/* عنوان کارت */}
                        {titleColumn && (
                            <div
                                className={
                                    row.isDeleted
                                        ? "text-base font-bold text-gray-400 mb-3"
                                        : "text-base font-bold text-gray-800 mb-3"
                                }
                            >
                                {titleColumn.render
                                    ? titleColumn.render(
                                          row[titleColumn.field],
                                          row
                                      )
                                    : row[titleColumn.field]}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                            {restColumns.map((col, idx) => (
                                <Fragment key={idx}>
                                    <span className="text-xs text-gray-400 font-medium self-center">
                                        {col.label}
                                    </span>

                                    <span
                                        className={
                                            row.isDeleted
                                                ? "text-sm text-gray-400 text-left"
                                                : "text-sm text-gray-800 text-left"
                                        }
                                    >
                                        {col.render
                                            ? col.render(
                                                  row[col.field],
                                                  row
                                              )
                                            : row[col.field]}
                                    </span>
                                </Fragment>
                            ))}
                        </div>

                        {/* عملیات */}
                        {actionColumns.length > 0 && (
                            <div
                                className={
                                    row.isDeleted
                                        ? "mt-3 pt-3 border-t border-gray-200"
                                        : "mt-3 pt-3 border-t border-gray-100"
                                }
                            >
                                {actionColumns.map((col, idx) => (
                                    <Fragment key={idx}>
                                        {col.render(null, row)}
                                    </Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DynamicTable;