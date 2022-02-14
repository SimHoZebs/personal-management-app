import { TaskProps } from "../schema/TaskSchema";
import StatusButton from "./StatusButton";
import TextField from "./TextField";

interface Props {
  task: TaskProps;
  setTask: React.Dispatch<React.SetStateAction<TaskProps>>;
  taskCardHidden: boolean;
  setTaskCardHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskCard = (props: Props) => {
  return !props.taskCardHidden ? (
    <div
      className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center "
      // onClick={(e) => e.stopPropagation}
    >
      <div
        className="bg-dark-300 absolute h-screen w-screen  opacity-25"
        onClick={() => props.setTaskCardHidden(true)}
      ></div>
      <div className="bg-dark-400 shadow-dark-900 z-10 flex h-3/4 w-2/5 flex-col items-start gap-y-1 px-3 py-4 shadow">
        <TextField
          className="hover:bg-dark-400 placeholder-true-gray-400 text-4xl"
          value={props.task.title}
        />
        <StatusButton
          statusIndex={props.task.statusIndex}
          setTask={props.setTask}
        />
      </div>
    </div>
  ) : (
    <div className="absolute"></div>
  );
};

export default TaskCard;
