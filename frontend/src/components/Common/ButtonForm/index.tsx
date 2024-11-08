/**
 * ButtonForm
 */
import React from "react"
/**
 * styles
 */
import styles from "./style.module.css"

interface Props  {
  onClick: () => void;
  children: React.ReactNode;
};

export const ButtonForm = (props: Props) => {
  const { onClick, children } = props;
  return (
    <div
      onClick={onClick}
      className={styles.buttonForm}
    >
      <p>{children}</p>
    </div>
  );
};