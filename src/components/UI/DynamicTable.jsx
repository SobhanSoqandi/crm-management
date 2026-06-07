

const DynamicTable = ({ columns, data, keyField = 'id' }) => {
  if (!data?.length) {
    return <div className="empty-table">داده‌ای وجود ندارد</div>;
  }

  return (
    <div className="table-container">
      <table className="dynamic-table">
        <thead >
          <tr>
            {columns.map((col, idx) => (
              <th key={idx}
              style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row[keyField]}>
              {columns.map((col, idx) => (
                <td key={idx}>
                  {col.render ? col.render(row[col.field], row) : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;