import type { ReactNode } from "react";
import styles from "./Table.module.css";

interface Column<T> {
  key: string;
  header: ReactNode;
  render: (item: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
  getRowKey: (item: T) => string | number;
}

export default function Table<T>({
  columns,
  data,
  emptyText = "No records found.",
  getRowKey,
}: TableProps<T>) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.empty}>
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={getRowKey(item)}>
                {columns.map((column) => (
                  <td key={column.key}>{column.render(item)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
