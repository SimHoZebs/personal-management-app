import apiFunctionHelper from "../apiFunctionHelper";
import { Post, Body } from "../../pages/api/user/[userId]/[goalId]";
import { TaskSchema } from "../schema/TaskSchema";

/**
 * Updates Goal's TaskArray by appending a new task to it.
 */
export default async function createTask(userId: string, goalId: string, task: TaskSchema) {

  return await apiFunctionHelper<Post, Body>({
    method: "post",
    url: `api/user/${userId}/${goalId}`,
    data: { task }
  });

}