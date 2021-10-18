const defaultTodoList = [
  { text: 'Learning Javascript', completed: true },
  { text: 'Learning ES2016', completed: true },
  { text: 'Learning Rax 小程序', completed: false },
];

export const handleTodoList = async (action = 'get') => {
  switch (action) {
    case 'get':
      return defaultTodoList;
    // case add
    default:
      return defaultTodoList;
  }
}
