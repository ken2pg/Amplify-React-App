//React,css関連ファイル
import React, { useEffect, useState, createContext } from 'react';
import './App.css';

//Amplify関連のライブラリ
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsmobile from './aws-exports';
import { listTodos } from './graphql/queries';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { ListTodosQuery } from './API';

//component関連ファイル
import InputForm from './component/input';

Amplify.configure(awsmobile);

type Todo = {
  id: string;
  name: string;
  description: string;
  completed: boolean;
};

//ReactContext定義
export const todoListContext = createContext(
  {} as {
    todoList: Todo[];
    setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  }
);

const App = () => {
  const [authState, setAuthState] = useState<AuthState>();
  const [user, setUser] = useState<object | undefined>();

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const fetchTodo = async () => {
    const res = (await API.graphql(graphqlOperation(listTodos))) as GraphQLResult;
    const todo = res.data as ListTodosQuery;
    if (todo.listTodos != null) {
      setTodoList(todo.listTodos.items as Todo[]);
    }
    await console.log('success');
  };

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
    fetchTodo();
  }, []);
  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <todoListContext.Provider value={{ todoList, setTodoList }}>
        <h2>todoList</h2>
        <InputForm />
        <AmplifySignOut />
      </todoListContext.Provider>
    </div>
  ) : (
    <AmplifyAuthenticator />
  );
};

export default App;
