import React, { createContext, useContext, useReducer } from "react";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type Action = { type: "added"; id: number; text: string } | { type: "changed"; task: Task } | { type: "deleted"; id: number };

type State = Task[];

type TasksDispatch = React.Dispatch<Action>;

const TasksContext = createContext<State | null>(null);

const TasksDispatchContext = createContext<TasksDispatch | null>(null);

const initialTasks: State = [
  { id: 0, text: "Philosopher’s Path", done: true },
  { id: 1, text: "Visit the temple", done: false },
  { id: 2, text: "Drink matcha", done: false },
];

function tasksReducer(state: State, action: Action): State {
  switch (action.type) {
    case "added": {
      return [...state, { id: action.id, text: action.text, done: false }];
    }
    case "changed": {
      return state.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return state.filter((t) => t.id !== action.id);
    }
    default: {
      throw new Error("Unknown action: " + action);
    }
  }
}

type Props = {
  children: React.ReactNode;
};

export function TasksProvider({ children }: Props): JSX.Element {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>{children}</TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

export function useTasks(): State {
  const tasks = useContext(TasksContext);
  if (tasks === null) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return tasks;
}

export function useTasksDispatch(): TasksDispatch {
  const dispatch = useContext(TasksDispatchContext);
  if (dispatch === null) {
    throw new Error("useTasksDispatch must be used within a TasksProvider");
  }
  return dispatch;
}
