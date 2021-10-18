import { createElement } from 'rax';

import './index.css';

function AddButton(props) {
  const { text, onClickMe } = props;
  return (
    <button className="add-button" hover-class="none" onClick={onClickMe}>
      <text className="add-icon">+</text>
      <text>{text}</text>
    </button>
  );
}

export default AddButton;
