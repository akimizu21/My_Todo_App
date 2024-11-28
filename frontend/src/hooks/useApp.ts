/**
 * useApp
 */

import React from 'react';
/**
 * components
 */
import { Todo, INIT_TODO_LIST, INIT_TODO_ID } from '../constants/data';
import { error } from 'console';
import { json } from 'stream/consumers';

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
  handlePostTodo: () => void;
  handleDeleteTodoRequest: (id: number) => void;
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
 const handlePostTodo = () => { 
   const newTodo = {
     title: addInputTodo,
     isDone: false,
    };
    
    fetch('http://localhost:8080/todo', {
      method: "POST",
      headers: {
        // サーバーへ送るファイルはJSONファイルであることを宣言
        'Content-Type': 'application/json',
      },
      // 送るデータをjson形式に変換
      body: JSON.stringify(newTodo)
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

  // 未完了 //
  /**
   * todoのisDoneを更新する処理
   */
  const onChangeIsDone = async (todoId: number, newIsDone: boolean) => {
    try {
      const response = await fetch('http://localhost:8080/todos', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: todoId,
          isDone: newIsDone,
        })
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error updating isDone:", error);
    }
  };
  
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
  const handleAddTodo = () => {
    // addInputTodoが空じゃないとき
    if (addInputTodo !== '') {
      const nextUniquId = uniquId + 1;

      const newTodoList = [
        ...todoList,
        {
          id: nextUniquId,
          title: addInputTodo,
          isDone: false,
        },
      ];

      // オリジナルのTodoListを更新
      setTodoList(newTodoList);

      // 検索用TodoListを更新
      updateShowTodoList(newTodoList, searchKeyword);
      // IDをインクリメント
      setUniquId(nextUniquId);
      // addINputTodoをリセット
      setAddInputTodo('');
    }
  };

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
      handlePostTodo,
      handleDeleteTodoRequest,
    },
  ];
};
