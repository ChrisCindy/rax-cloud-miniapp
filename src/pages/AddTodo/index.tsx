import { createElement, useState } from 'rax';
import View from 'rax-view';
import AddButton from '@/components/AddButton';


import './index.css';

function AddTodo() {
  const [inputValue, setInputValue] = useState('');
  async function add() {
    // TODO:
  }
  function onBlur(e) {
    setInputValue(e.detail.value);
  }
  return (
    <View className="page-add-todo">
      <View className="add-todo">
        <input
          className="add-todo-input"
          placeholder="What needs to be done?"
          onBlur={onBlur}
          value={inputValue}
        />
      </View>
      <View className="todo-footer">
        <AddButton text="Add Todo" onClickMe={add} />
      </View>
  </View>
  );
}

export default AddTodo;
