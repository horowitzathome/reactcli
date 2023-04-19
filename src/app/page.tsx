"use client";

import "reflect-metadata";
import { useContext, useState } from "react";
import React from "react";
import { NavigationPages } from "./navigate";
import Test from "./test/page";
import { Button } from "flowbite-react";
import { StateProvider, store } from "./store.js";
import { createContext } from "react";
import { TasksProvider } from "./TaskContext";

export default function Home() {
  const [pageValue, setPageValue] = useState<NavigationPages>(NavigationPages.Main);

  const buttonHandlerTest = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPageValue(NavigationPages.Test);
  };

  function pageSelect(): React.ReactNode {
    if (pageValue == NavigationPages.Main) {
      return pageMain();
    } else if (pageValue == NavigationPages.Test) {
      return pageTest();
    }

    return <></>;
  }

  function pageTest(): React.ReactNode {
    //return <Test pageValueParam={pageValue} setPageValueParam={setPageValue}></Test>;
    return <Test></Test>;
  }

  function showTest(): boolean {
    return true;
  }

  function pageMain(): React.ReactNode {
    return (
      <div className="flex">
        <div>
          {showTest() && (
            <Button id="page-settings" color="gray" size="xs" onClick={buttonHandlerTest} className="mr-4">
              Test
            </Button>
          )}
        </div>
      </div>
    );
  }

  //type ThemeContextType = "light" | "dark";
  //const newContext = createContext({ color: 'black' });
  //const newContext = createContext<ThemeContextType>("light");

  const globalState = useContext(store);
  console.log("Global state color in main page = " + globalState.color);

  return (
    <div className="pl-5 pr-5">
      <div>Some Text</div>
      <TasksProvider>
        <div className="mt-3">{pageSelect()}</div>
      </TasksProvider>
    </div>
  );
}
