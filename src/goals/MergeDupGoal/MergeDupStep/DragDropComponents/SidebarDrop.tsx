import { IconButton, Typography } from "@material-ui/core";
import { ArrowForwardIos } from "@material-ui/icons";
import { ReactElement } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";

import SidebarDragSense from "goals/MergeDupGoal/MergeDupStep/DragDropComponents/SidebarDragSense";
import {
  MergeTreeSense,
  Sidebar,
} from "goals/MergeDupGoal/MergeDupStep/MergeDupsTree";
import { setSidebar } from "goals/MergeDupGoal/Redux/MergeDupActions";

interface SidebarDropProps {
  sidebar: Sidebar;
  vernacular: string;
}

export default function SidebarDrop(props: SidebarDropProps): ReactElement {
  const dispatch = useDispatch();

  return (
    <Droppable
      droppableId={`${props.sidebar.wordId} ${props.sidebar.mergeSenseId}`}
      key={props.sidebar.mergeSenseId}
    >
      {(providedDroppable): ReactElement => (
        <div
          ref={providedDroppable.innerRef}
          {...providedDroppable.droppableProps}
          /* Add the height of the app bar (64) to the top padding. */
          style={{
            backgroundColor: "lightblue",
            height: "100%",
            padding: 30,
            paddingTop: 64 + 30,
          }}
        >
          <IconButton onClick={() => dispatch(setSidebar())} id="sidebar-close">
            <ArrowForwardIos />
          </IconButton>
          <Typography variant="h5">{props.vernacular}</Typography>
          {props.sidebar.senses.map((sense: MergeTreeSense, index: number) => (
            <SidebarDragSense
              key={index}
              index={index}
              sidebar={props.sidebar}
              sense={sense}
            />
          ))}
          {providedDroppable.placeholder}
        </div>
      )}
    </Droppable>
  );
}
