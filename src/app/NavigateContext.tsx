"use client";

import React, { createContext, useContext, useReducer } from "react";

export enum NavigationPage {
  Main,
  Test,
}

export type PageAction = { type: "next"; page: NavigationPage };

export type PageState = NavigationPage;

type PageDispatch = React.Dispatch<PageAction>;

const PageContext = createContext<PageState | null>(null);

const PageDispatchContext = createContext<PageDispatch | null>(null);

export type PageReducerType = (state: PageState, action: PageAction) => PageState;

const initialPage: PageState = NavigationPage.Main;

function pageReducer(state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case "next": {
      return action.page;
    }
    default: {
      throw new Error("Unknown page action: " + action);
    }
  }
}

type Props = {
  children: React.ReactNode;
};

export function PageProvider({ children }: Props): JSX.Element {
  const [tasks, dispatch] = useReducer(pageReducer, initialPage);

  return (
    <PageContext.Provider value={tasks}>
      <PageDispatchContext.Provider value={dispatch}>{children}</PageDispatchContext.Provider>
    </PageContext.Provider>
  );
}

export function usePage(): PageState {
  const tasks = useContext(PageContext);
  if (tasks === null) {
    return NavigationPage.Main;
  }
  return tasks;
}

export function usePageDispatch(): PageDispatch {
  const dispatch = useContext(PageDispatchContext);
  if (dispatch === null) {
    return dummyDispatch;
  }
  return dispatch;
}

export function navigateTo(dispatchPage: PageDispatch, nextPage: NavigationPage) {
  let pageAction: PageAction = {
    type: "next",
    page: nextPage,
  };
  dispatchPage(pageAction);
}

function dummyDispatch(value: PageAction) {}
