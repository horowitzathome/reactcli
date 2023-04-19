"use client";

import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { NavigationPages } from "../navigate";
import { Button } from "flowbite-react";
import { SERVER_URL } from "../constants";
import { store } from "../store";
import { useTasks, useTasksDispatch } from "../TaskContext";
import NoSSRWrapper from "../NoSSRWrapper";

type DogType = {
  name: string;
  age: number;
};

/*
export default function Test({
  pageValueParam,
  setPageValueParam,
}: {
  pageValueParam: NavigationPages;
  setPageValueParam: Dispatch<SetStateAction<NavigationPages>>;
}) {
*/

export default function Test() {
  let nextId = 3;
  console.log("nextId = " + nextId);

  const ButtonHandlerHome = (event: React.MouseEvent<HTMLButtonElement>) => {
    //    setPageValueParam(NavigationPages.Main);
    //const globalState = useContext(store);
    //const { dispatch } = globalState;
    //dispatch({ type: 'action description' });

    dispatch({
      type: "added",
      id: nextId++,
      text: "Milk " + nextId,
    });
  };

  const [dogValue, setDogValue] = useState<DogType>();

  async function getDog() {
    console.log("getDog ...");

    let url = SERVER_URL + "/hello/dog";
    console.log("url = " + url);

    fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((dog: DogType) => {
        console.log("Dogs name = " + dog.name);
        console.log("Dogs age = " + dog.age);

        setDogValue(dog);
      })
      .catch((error) => {
        console.log("An error occurred getting the dog with " + error);
      });
  }

  const tasks = useTasks();
  function ShowTasks(): React.ReactNode {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    );
  }

  function showDog(): React.ReactNode {
    return (
      <div>
        <div>
          Name of dog is {dogValue?.name} and it is {dogValue?.age} year(s) old
        </div>
      </div>
    );
  }

  /*
  function showHost(): React.ReactNode {
    const host = window.location.host; // this will return the host and port (if specified), e.g. "example.com:8080"
    const hostname = window.location.hostname; // this will return the hostname, e.g. "example.com"

    console.log("host = " + host);
    console.log("hostname = " + host);

    return (
      <div>
        Host is {host} and hostname is {hostname}
      </div>
    );
  }
*/

  useEffect(() => {
    console.log("Will call getDog");
    getDog();
    //}, [pageValueParam]);
  }, []);

  //  <div className="bdr-text-color">{showHost()}</div>

  const globalState = useContext(store);
  const dispatch = useTasksDispatch();
  console.log("Global state color in TestPage = " + globalState.color);

  return (
    <NoSSRWrapper>
      <div>
        <h1 className="bdr_heading">Test</h1>

        <div className="bdr-text-color">{showDog()}</div>

        <div>{ShowTasks()}</div>

        <div className="mt-5">
          <Button color="gray" size="sm" onClick={ButtonHandlerHome}>
            Zurück
          </Button>
          <Button
            color="gray"
            size="sm"
            onClick={(e) => {
              dispatch({
                type: "added",
                id: nextId++,
                text: "Milk " + nextId,
              });
            }}
          >
            Neuer Task
          </Button>
        </div>
      </div>
    </NoSSRWrapper>
  );
}
