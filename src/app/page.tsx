"use client";

import "reflect-metadata";
import { useContext, useReducer, useState } from "react";
import React from "react";
import { NavigationPages } from "./navigate";

import { Button } from "flowbite-react";
import { StateProvider, store } from "./store.js";
import { createContext } from "react";
import Test from "./test/page";
import { NavigationPage, navigateTo, usePage, usePageDispatch } from "./NavigateContext";

export default function Home() {
  //const [pageValue, setPageValue] = useState<NavigationPages>(NavigationPages.Main);

  const dispatchPage = usePageDispatch();
  const currentPage = usePage();

  const buttonHandlerTest = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setPageValue(NavigationPages.Test);
    navigateTo(dispatchPage, NavigationPage.Test);
  };

  function pageSelect(): React.ReactNode {
    console.log("pageSelect to page " + currentPage);
    if (currentPage == NavigationPage.Main) {
      return pageMain();
    } else if (currentPage == NavigationPage.Test) {
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
      <div className="mt-3">{pageSelect()}</div>
    </div>
  );
}
