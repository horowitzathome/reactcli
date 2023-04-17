"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NavigationPages } from "../navigate";
import { Button } from "flowbite-react";
import { SERVER_URL } from "../constants";

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
  const buttonHandlerHome = (event: React.MouseEvent<HTMLButtonElement>) => {
    //    setPageValueParam(NavigationPages.Main);
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

  return (
    <div>
      <h1 className="bdr_heading">Test</h1>

      <div className="bdr-text-color">{showDog()}</div>

      <div className="mt-5">
        <Button color="gray" size="sm" onClick={buttonHandlerHome}>
          Zurück
        </Button>
      </div>
    </div>
  );
}
