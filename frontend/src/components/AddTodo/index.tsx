/**
 * AddTodo
 */
/**
 * components
 */
import { InputForm } from '../Common/InputForm';
import { ButtonForm } from '../Common/ButtonForm';

/**
 * styles
 */
import styles from './style.module.css';

interface Props {
  addInputTodo: string;
  onChangeAddInputTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTodo: () => void;
}

export const AddTodo = (props: Props) => {
  const { addInputTodo, onChangeAddInputTodo, handleAddTodo } = props;
  return (
    <>
      <h2>ADD TODO</h2>
      <div className={styles.inputArea}>
        <InputForm
          placeholder={'New Todo'}
          inputValue={addInputTodo}
          handleChangeValue={onChangeAddInputTodo}
        />
        <ButtonForm onClick={handleAddTodo}>
          追加
        </ButtonForm>
      </div>
    </>
  );
};
