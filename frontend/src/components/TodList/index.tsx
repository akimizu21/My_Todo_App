/**
 * TodoList
 */
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
/**
 * components
 */
import { Todo } from '../../constants/data';
/**
 * styles
 */
import styles from './style.module.css';

interface Props {
  selectTab: string;
  todoList: Todo[];
  handleCheckTodo: (id: number, title: string) => void;
  handleDeleteTodo: (id: number, title: string) => void;
  handleDeleteTodoRequest: (id: number) => void;
}

export const TodoList = (props: Props) => {
  const { selectTab, todoList, handleCheckTodo, handleDeleteTodo, handleDeleteTodoRequest } = props;
  return (
    <>
      {selectTab === '未完了' && (
        <ul className={styles.todoList}>
          {todoList
            .filter((todo: any) => todo.isDone === false)
            .map((todo: any) => {
              return (
                <li className={styles.todoContents} key={todo.id}>
                  <span>{todo.title}</span>
                  <div className={styles.farContainer}>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      onClick={() => handleCheckTodo(todo.id, todo.title)}
                      className={styles.far}
                    />
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={() => {
                        handleDeleteTodo(todo.id, todo.title);
                        handleDeleteTodoRequest(todo.id);
                      }}
                      className={styles.far}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      )}
      {selectTab === '完了' && (
        <ul className={styles.todoList}>
          {todoList
            .filter((todo: any) => todo.isDone === true)
            .map((todo: any) => {
              return (
                <li className={styles.todoContents} key={todo.id}>
                  <span>{todo.title}</span>
                  <div className={styles.farContainer}>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      onClick={() => handleDeleteTodo(todo.id, todo.title)}
                      className={styles.far}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
};
