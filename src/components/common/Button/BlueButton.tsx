import styles from "./BlueButton.module.css";

type BlueButtonProps = {
  text?: string;
  onClick?: () => void;
};

export default function BlueButton({ text = "Select...", onClick }: BlueButtonProps) {
  return (
    <button className={styles.button} onClick={onClick}>
      <span className={styles.text}>{text}</span>
    </button>
  );
}