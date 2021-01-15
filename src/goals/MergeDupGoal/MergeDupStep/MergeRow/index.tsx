import { connect } from "react-redux";

import { StoreState } from "../../../../types";
import { StoreStateDispatch } from "../../../../types/actions";
import { setVern } from "../MergeDupStepActions";
import MergeRowComponent from "./MergeRowComponent";

export function mapStateToProps(state: StoreState) {
  return {
    words: state.mergeDuplicateGoal.tree.words,
    data: state.mergeDuplicateGoal.data,
  };
}

export function mapDispatchToProps(dispatch: StoreStateDispatch) {
  return {
    setVern: (wordID: string, vern: string) => {
      dispatch(setVern(wordID, vern));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MergeRowComponent);
