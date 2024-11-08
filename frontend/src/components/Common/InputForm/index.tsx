/**
 * InputForm
 */
import React from 'react';
/**
 * styles
 */
import styles from './style.module.css';

interface Props {
  placeholder: string;
  inputValue: string;
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputForm = (props: Props) => {
  const { inputValue, placeholder, handleChangeValue } = props;
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={inputValue}
      onChange={handleChangeValue}
      className={styles.from}
    />
  );
};
