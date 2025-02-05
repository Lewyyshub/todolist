import "./container.scss";
import Todo from "../../__molecules/FirstSide/todo";
import Tasks from "../../__atoms/Task/task";

function Container() {
  return (
    <>
      <div className="main-container">
        <Todo />
        <Tasks />
      </div>
    </>
  );
}

export default Container;
