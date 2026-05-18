import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: ReactNode;
}

export default function Input({ error, id, label, ...props }: InputProps) {
  const inputId = id ?? String(props.name);

  return (
    <label className={styles.field} htmlFor={inputId}>
      <span>{label}</span>
      <input id={inputId} className={error ? styles.invalid : ""} {...props} />
      {error && <small>{error}</small>}
    </label>
  );
}
