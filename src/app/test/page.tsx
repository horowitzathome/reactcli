"use client";

import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { SERVER_URL } from "../constants";
import { navigateTo, NavigationPage, usePage, usePageDispatch } from "../NavigateContext";

type DogType = {
  name: string;
  age: number;
};

export default function Test() {
  const dispatchPage = usePageDispatch();
  const currentPage = usePage();

  let nextId = 3;
  console.log("nextId = " + nextId);

  const ButtonHandlerHome = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigateTo(dispatchPage, NavigationPage.Main);
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

  function showDog(): React.ReactNode {
    return (
      <div>
        <div>
          Name of dog is {dogValue?.name} and it is {dogValue?.age} year(s) old
        </div>
      </div>
    );
  }

  useEffect(() => {
    console.log("Will call getDog");
    getDog();
    //}, [pageValueParam]);
  }, []);

  return (
    <div>
      <h1 className="bdr_heading">Test</h1>

      <div className="bdr-text-color">{showDog()}</div>

      <div className="mt-5">
        <Button color="gray" size="sm" onClick={ButtonHandlerHome}>
          Zurück
        </Button>
      </div>
    </div>
  );
}
