import React, { useEffect, useState, useContext } from 'react';
import '../css/input.css';

import { todoListContext } from '../App';

const InputForm = () => {
  const [form, setForm] = useState({ id: 1, name: '', description: '', complete: false });
  const nameFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      name: event.target.value,
    });
  };
  const DescriptionFormChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      description: event.target.value,
    });
  };
  const { todoList, setTodoList } = useContext(todoListContext);

  return (
    <div className="inputComponet">
      <p>todoリスト名</p>
      <input type="form" onChange={nameFormChange}></input>
      <p>詳細説明</p>
      <textarea onChange={DescriptionFormChange}></textarea>
      {/* <p>{form.description}</p> */}
      <br />
      <button>登録</button>
    </div>
  );
};

export default InputForm;
