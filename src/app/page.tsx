"use client";

import "reflect-metadata";
import { useState } from "react";
import React from "react";
import { NavigationPages } from "./navigate";
import Test from "./test/page";
import { Button } from "flowbite-react";

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

  return (
    <div className="pl-5 pr-5">
      <div className="mt-3">{pageSelect()}</div>
    </div>
  );
}
