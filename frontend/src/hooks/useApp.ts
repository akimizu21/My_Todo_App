/**
 * useApp
 */

import React from 'react';
/**
 * components
 */
import { Todo, INIT_TODO_LIST, INIT_TODO_ID } from '../constants/data';

interface State {
  addInputTodo: string;
  selectTab: string;
  showTodoList: Todo[];
  searchKeyword: string;
}

interface Actions {
  onChangeAddInputTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTodo: () => void;
  setSelectTab: (tab: string) => void;
  handleCheckTodo: (id: number, title: string) => void;
  handleDeleteTodo: (id: number, title: string) => void;
  handelSearchTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteTodoRequest: (id: number) => void;
  onChangeIsDone: (id: number, isDone: boolean) => void;
}

/**
 *
 * @returns
 */
export const useApp = (): [State, Actions]=> {
  /* addInputTodo */
  const [addInputTodo, setAddInputTodo] = React.useState<string>('');
  /* todoList */
  const [todoList, setTodoList] = React.useState<Todo[]>(INIT_TODO_LIST);
  /* 採番用ID */
  const [uniquId, setUniquId] = React.useState<number>(INIT_TODO_ID);
  /* selectTab */
  const [selectTab, setSelectTab] = React.useState<string>('未完了');
  /* 検索キーワード */
  const [searchKeyword, setSearchKeyword] = React.useState<string>('');
  /* show todo list */
  const [showTodoList, setShowTodoList] = React.useState<Todo[]>(INIT_TODO_LIST);

  /**
   * TodoList取得処理
   */
  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: "GET"
      });
      const data = await response.json();
      setTodoList(data);
      updateShowTodoList(data,searchKeyword);
    } catch (error) {
      console.error('Request Not Found', error);
    }
  }

  /**
   * Todoをサーバーへ送る処理
  */
 const handlePostTodo = async () => { 
   const newTodo = {
     title: addInputTodo,
     isDone: false,
    };
    
    try {
      const response = await fetch('http://localhost:8080/todo', {
        method: "POST",
        headers: {
          // サーバーへ送るファイルはJSONファイルであることを宣言
          'Content-Type': 'application/json',
        },
        // 送るデータをjson形式に変換
        body: JSON.stringify(newTodo)
      });
      
      if (!response.ok) {
        throw new Error('Failed to add Todo');
      }

      const addedTodo = await response.json();
      console.log("Successfully added Todo:", addedTodo);

      return addedTodo;
    } catch (error) {
      console.error('Error adding Todo:', error);
      throw error;
    }
  }

  /**
   * Todo削除処理(DB)
   * @param targetId 
   */
  const handleDeleteTodoRequest = async (targetId: number) => {
    fetch(`http://localhost:8080/todo/${targetId}`, {
      method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
      console.log("Succsess", data);
    })
    .catch((error) => {
      console.log("Error", error)
    })
  }

  /**
   * todoのisDoneを更新する処理
   */
  const onChangeIsDone = async (targetId: number, newIsDone: boolean) => {
    fetch (`http://localhost:8080/update-todo/${targetId}`, {
     method: "POST",
     headers: {
      "Content-Type": "application/json"
     },
     body: JSON.stringify({
      id: targetId,
      isDone: newIsDone,
     })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Succsess", data);
    })
    .catch((error) => {
      console.log("Error", error)
    });
  }
  
  /**
   * addInputTodo更新処理
   * @param e
   */
  const onChangeAddInputTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddInputTodo(e.target.value);
  };

  /**
   * Todo追加処理
   */
  const handleAddTodo = async () => {
    if (addInputTodo !== '') {
      try {
        // サーバーにTodoを追加
        await handlePostTodo();

        // サーバーから最新データを取得
        await getData();

        // addINputTodoをリセット
        setAddInputTodo('');
      } catch (error) {
        console.error('Error in handleAddTodo:', error);
        alert("データの追加に失敗しました")
      }
    }
  }

  /**
   * Todo削除処理
   * @param targetId
   * @param targetTitle
   */
  const handleDeleteTodo = (targetId: number, targetTitle: string) => {
    if (window.confirm(`${targetTitle}を削除しますか?`)) {
      const newTodoList = todoList.filter((todo: any) => {
        return todo.id !== targetId;
      });
      setTodoList(newTodoList);

      // 表示用TodoListを更新
      updateShowTodoList(newTodoList, searchKeyword);

      // サーバーへ削除を送信
      handleDeleteTodoRequest(targetId);
    }
  };

  /**
   * Todo完了処理
   * @param targetId
   */
  const handleCheckTodo = (targetId: number, targetTitle: string) => {
    if (window.confirm(`${targetTitle}を完了しましたか?`)) {
      const doneTodoList = todoList.map((todo: any) => {
        if (todo.id === targetId) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
      // 更新されたTodoListをセット
      setTodoList(doneTodoList);

      // 表示用TodoListを更新
      updateShowTodoList(doneTodoList, searchKeyword);

      // サーバーへ更新を通信
      onChangeIsDone(targetId, true);
    }
  };

  /**
   * SearchTodo更新処理
   * @param e
   */
  const handelSearchTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);

    updateShowTodoList(todoList, keyword);
  };

  /**
   * Todo検索処理
   * @param keyword
   * @returns
   */
  const searchTodo = (targetTodoList: Todo[], keyword: string) => {
    // 検索処理
    const newTodoList = targetTodoList.filter((todo: Todo) => {
      const regexp = new RegExp('^' + keyword, 'i');
      return todo.title.match(regexp);
    });
    // 検索条件にマッチしたTodoだけを返す
    return newTodoList;
  };

  const updateShowTodoList = (newTodoList: Todo[], keyword: string) => {
    if (keyword !== '') {
      // 検索キーワードがある場合は、検索処理を実施して更新する
      setShowTodoList(searchTodo(newTodoList, keyword));
    } else {
      // 検索キーワードがない場合は、元のTodoList
      setShowTodoList(newTodoList);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return [
    {
      addInputTodo,
      selectTab,
      showTodoList,
      searchKeyword,
    },
    {
      onChangeAddInputTodo,
      handleAddTodo,
      setSelectTab,
      handleCheckTodo,
      handleDeleteTodo,
      handelSearchTodo,
      handleDeleteTodoRequest,
      onChangeIsDone,
    },
  ];
};
