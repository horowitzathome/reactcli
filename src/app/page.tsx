"use client";

import "reflect-metadata";
import React from "react";
import { Button } from "flowbite-react";
import Test from "./test/page";
import { NavigationPage, navigateTo, usePage, usePageDispatch } from "./NavigateContext";

export default function Home() {
  const dispatchPage = usePageDispatch();
  const currentPage = usePage();

  const buttonHandlerTest = (event: React.MouseEvent<HTMLButtonElement>) => {
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

  return (
    <div className="pl-5 pr-5">
      <div>Some Text</div>
      <div className="mt-3">{pageSelect()}</div>
    </div>
  );
}
