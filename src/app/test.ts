import React from "react";

type Props = {
    actualSort?:string;
    sorts:string[];
  }
  export const SortListContext = React.createContext<Props>({
    sorts: []
  });

  