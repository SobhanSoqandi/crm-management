import { Fragment } from "react";

function getRowStyle(row) {
    if (row.isDeleted) {
        return {
            row: "bg-gray-100 text-gray-400 opacity-70",
            card: "rounded-2xl border border-gray-300 bg-gray-100 shadow-sm p-4 opacity-70",
            title: "text-base font-bold text-gray-400 mb-3",
            cell: "text-sm text-gray-400 text-left",
        };
    }

    if (row.is_paid) {
        return {
            row: "bg-[#f1fff1] border-b border-emerald-100",
            card: "rounded-2xl border border-emerald-200 bg-[#f1fff1] shadow-sm p-4",
            title: "text-base font-bold text-gray-800 mb-3",
            cell: "text-sm text-gray-800 text-left",
        };
    }

    return {
        row: "border-b border-gray-100",
        card: "rounded-2xl border border-gray-200 bg-white shadow-sm p-4",
        title: "text-base font-bold text-gray-800 mb-3",
        cell: "text-sm text-gray-800 text-left",
    };
}

const DynamicTable = ({ columns, data, keyField = "id" }) => {
    if (!data?.length) {
        return <span className="text-rose-600 bg-red-50 p-3 rounded-2xl" >  داده ای یافت نشد . . .   </span>;
    }

    const actionColumns = columns.filter((c) => !c.field && c.render);
    const dataColumns = columns.filter((c) => c.field);
    const [titleColumn, ...restColumns] = dataColumns;

    return (
        <div className="w-full">
           
            <div className="hidden md:block overflow-x-auto overflow-y-auto max-h-[500px] ">
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
                        {data.map((row) => {
                            const style = getRowStyle(row);
                            return (
                                <tr key={row[keyField]} className={style.row}>
                                    {columns.map((col, idx) => (
                                        <td key={idx} className="px-4 py-4">
                                            {col.render
                                                ? col.render(row[col.field], row)
                                                : row[col.field]}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden flex flex-col gap-3 overflow-y-scroll max-h-[400px]">
                {data.map((row) => {
                    const style = getRowStyle(row);
                    return (
                        <div key={row[keyField]} className={style.card}>
                            
                            {row.isDeleted && (
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-base font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-md">
                                        این نوبت حذف شده است
                                    </span>
                                </div>
                            )}

                       

                           
                            {titleColumn && (
                                <div className={style.title}>
                                    {titleColumn.render
                                        ? titleColumn.render(row[titleColumn.field], row)
                                        : row[titleColumn.field]}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                                {restColumns.map((col, idx) => (
                                    <Fragment key={idx}>
                                        <span className="text-base text-gray-400 font-medium self-center">
                                            {col.label} :
                                        </span>

                                        <span className={style.cell}>
                                            {col.render
                                                ? col.render(row[col.field], row)
                                                : row[col.field]}
                                        </span>
                                    </Fragment>
                                ))}
                            </div>

                       
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
                    );
                })}
            </div>
        </div>
    );
};

export default DynamicTable;
