import type { ReactNode } from "react";
import Button from "./Button";
import styles from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  confirmLabel?: string;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm?: () => void;
}

export default function Modal({
  children,
  confirmLabel = "Confirm",
  isOpen,
  title,
  onClose,
  onConfirm,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} role="presentation">
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header>
          <h2 id="modal-title">{title}</h2>
        </header>
        <div className={styles.body}>{children}</div>
        <footer>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {onConfirm && (
            <Button type="button" variant="danger" onClick={onConfirm}>
              {confirmLabel}
            </Button>
          )}
        </footer>
      </section>
    </div>
  );
}
