/**
 * App
 */
import React from "react";
/**
 * components
 */
import { AddTodo } from "./components/AddTodo";
import { SelectTodo } from "./components/SelectTodo";
import { TodoList } from "./components/TodList";
import { InputForm } from "./components/Common/InputForm";
/**
 * hooks
 */
import { useApp } from "./hooks/useApp";
/**
 * styles
 */
import styles from "./App.module.css"
/**
 * 
 * @returns 
 */
export const App = () => {
  /* hooks */
  const [state, actions] = useApp()

  return (
    <>
      <h1 className={styles.title}>TODO LIST</h1>

      {/* ADD TODO 領域 */}
      <section className={styles.commonArea}>
        <AddTodo
          addInputTodo={state.addInputTodo}
          onChangeAddInputTodo={actions.onChangeAddInputTodo}
          handleAddTodo={actions.handleAddTodo}
          handlePostTodo={actions.handlePostTodo}
        />
      </section>

      {/* Todo検索フォーム 領域 */}
      <section className={styles.commonArea}>
        <InputForm
          placeholder={'Search keyword'}
          inputValue={state.searchKeyword}
          handleChangeValue={actions.handelSearchTodo}
        />
      </section>

      {/* SELECT TODO 領域 */}
      <section className={styles.commonArea}>
        <SelectTodo
          setSelectTab={actions.setSelectTab}
          selectTab={state.selectTab}
        />
      </section>

      {/* TODO LIST 表示領域 */}
      <section className={styles.commonArea}>
        <TodoList
          selectTab={state.selectTab}
          todoList={state.showTodoList}
          handleCheckTodo={actions.handleCheckTodo}
          handleDeleteTodo={actions.handleDeleteTodo}
        />
      </section>
    </>
  );
};