import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

// components
import Task from "./Task";
import GoalHeader from "./GoalHeader";
import Button from "./Button";

//etc
import { TaskSchema } from "../schema/TaskSchema";
import readGoal from "../api/readGoal";
import { UserContext } from "../../pages/user/[userId]";
import { GoalSchema } from "../schema/GoalSchema";
import isLoaded from "../isLoaded";

interface Props {
  goalId: string;
  setCurrGoalTitle: Dispatch<SetStateAction<string | undefined>>;
}

const Goal = (props: Props) => {
  const user = useContext(UserContext);
  const [goal, setGoal] = useState<GoalSchema | undefined>();
  const [taskArray, setTaskArray] = useState<TaskSchema[]>([]);
  const [creatingTask, setCreatingTask] = useState(false);

  /**
   * Readies goal to respond accoridngly to new task interaction.
   * @note For more info, check Task.tsx
   */
  function createTaskBtn() {
    const newTask = {
      title: "",
      userId: user?._id,
      goalId: props.goalId,
      statusColor: goal?.statusColorArray[0],
    } as TaskSchema;

    setTaskArray((prev) => [...prev, newTask]);
    setCreatingTask(true);
  }

  useEffect(() => {
    async function initGoal() {
      const readGoalRes = await readGoal(user?._id, props.goalId);
      if (!(readGoalRes instanceof Error)) {
        setGoal(readGoalRes);
        setTaskArray((prev) => readGoalRes.taskArray);
        props.setCurrGoalTitle(readGoalRes.title);
      }
    }

    initGoal();
  }, [props, user?._id]);

  return (
    <>
      <GoalHeader
        goalId={goal?._id}
        description={goal?.description}
        title={goal?.title}
        setGoal={setGoal}
      />

      <hr className="border-dark-300" />

      <div className="flex flex-col gap-y-2 items-start">
        {taskArray.length !== 0 && isLoaded<GoalSchema>(goal) ? (
          taskArray.map((task, index) => (
            <Task
              statusColorArray={goal.statusColorArray}
              key={index}
              task={task}
              taskIndex={index}
              setTaskArray={setTaskArray}
              setCreatingTask={setCreatingTask}
              isNewTask={
                creatingTask && index === taskArray.length - 1 ? true : false
              }
            />
          ))
        ) : (
          <p>There is no task in the goal! Start by adding one!</p>
        )}

        <Button onClick={() => createTaskBtn()}>CREATE TASK</Button>
      </div>
    </>
  );
};

export default Goal;
