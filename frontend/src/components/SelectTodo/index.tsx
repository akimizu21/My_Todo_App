/**
 * SelectTodo
 */
/**
 * styles
 */
import styles from './style.module.css';

interface Props {
  setSelectTab: (tab: string) => void;
  selectTab: string;
}

export const SelectTodo = (props: Props) => {
  const { setSelectTab, selectTab } = props;
  return (
    <>
      <ul className={styles.todoSelect}>
        <li
          onClick={() => setSelectTab('未完了')}
          className={`${styles.Tab} ${
            selectTab === '未完了' ? styles.active : ''
          }`}
        >
          未完了
        </li>
        <li
          onClick={() => setSelectTab('完了')}
          className={`${styles.Tab} ${
            selectTab === '完了' ? styles.active : ''
          }`}
        >
          完了
        </li>
      </ul>
    </>
  );
};
