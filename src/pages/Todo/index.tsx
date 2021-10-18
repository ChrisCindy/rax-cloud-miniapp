import { createElement, useState } from 'rax';
import useAsyncEffect from 'rax-use-async-effect';
import View from 'rax-view';
import Text from 'rax-text';
import './index.css';
import Logo from '@/components/Logo';
import { getTodoList } from '@/cloud/function';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'checkbox-group': any;
      'checkbox': any;
    }
  }
}
interface todoItem {
  completed: boolean;
  text: string;
}

declare const item: todoItem;

export default function Home() {
  const [todos, setTodos] = useState<todoItem []>([]);

  useAsyncEffect(async () => {
    const todoList = await getTodoList();
    setTodos(todoList);
  }, []);

  function onTodoChanged(e) {
    const checkedTodos = e.detail.value;
    const newTodos = todos.map(todo => ({
      ...todo,
      completed: checkedTodos.indexOf(todo.text) > -1,
    }));
    setTodos(newTodos);
  }

  return (
    <View className="page-todos">
      <View className="user">
        <Logo uri="https://ucc.alicdn.com/aliyun-marketing/market/EIRyyFKB3VepnhqBFMRl9cxbqmAPnPd6.png" />
        <View className="nickname">Todo List</View>
      </View>
      <View className="todo-items">
        <checkbox-group className="todo-items-group" onChange={onTodoChanged}>
          <label x-for={item as any in todos} key={item.text} x-class={{ 'todo-item': true, checked: item.completed }}>
            <checkbox className="todo-item-checkbox" value={item.text} checked={item.completed} />
            <Text className="todo-item-text">{item.text}</Text>
          </label>
        </checkbox-group>
      </View>
    </View>
  );
}
