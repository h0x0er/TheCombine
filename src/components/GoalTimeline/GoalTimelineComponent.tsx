import { Button, GridList, GridListTile, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Translate } from "react-localize-redux";

import HorizontalDisplay from "components/GoalTimeline/GoalDisplay/HorizontalDisplay";
import VerticalDisplay from "components/GoalTimeline/GoalDisplay/VerticalDisplay";
import { Goal, GoalType } from "types/goals";
import { goalTypeToGoal } from "types/goalUtilities";

const timelineStyle = {
  centerDisplays: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  centerButton: {
    padding: "70px 0",
    textAlign: "center",
    width: "100%",
    height: "80%",
  },
  paneStyling: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    textAlign: "center",
  },
};

interface GoalTimelineProps {
  chooseGoal: (goal: Goal) => void;
  loadHistory: () => void;

  allPossibleGoals: Goal[];
  history: Goal[];
  suggestions: Goal[];
}

interface GoalTimelineState {
  portrait: boolean;
  reducedLandScape: boolean;
}

/**
 * Displays the list of goals the user has decided they will work on, their
 * choices for the next goal, and suggestions for which goals they should choose
 * to work on.
 */
export default class GoalTimeline extends React.Component<
  GoalTimelineProps,
  GoalTimelineState
> {
  constructor(props: GoalTimelineProps) {
    super(props);
    this.state = {
      portrait: window.innerWidth < window.innerHeight,
      reducedLandScape: (window.innerWidth * 7) / 10 < window.innerHeight,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({
      portrait: window.innerWidth < window.innerHeight,
      reducedLandScape: (window.innerWidth * 7) / 10 < window.innerHeight,
    });
  };

  // Load history from database
  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    this.props.loadHistory();
  }

  // Given a change event, find which goal the user selected, and choose it
  // as the next goal to work on.
  handleChange(goalType: GoalType) {
    // Create a new goal to prevent mutating the suggestions list.
    this.props.chooseGoal(goalTypeToGoal(goalType));
  }

  // Creates a list of suggestions, with non-suggested goals at the end and
  // our main suggestion absent (to be displayed on the suggestions button)
  createSuggestionData(): Goal[] {
    const suggestions = this.props.suggestions;
    if (!suggestions.length) {
      return this.props.allPossibleGoals;
    }
    const secondarySuggestions = suggestions.slice(1);
    const suggestionTypes = suggestions.map((g) => g.goalType);
    const nonSuggestions = this.props.allPossibleGoals.filter(
      (g) => !suggestionTypes.includes(g.goalType)
    );
    secondarySuggestions.push(...nonSuggestions);
    return secondarySuggestions;
  }

  // Creates a button for our recommended goal
  goalButton(): ReactElement {
    const done = this.props.suggestions.length === 0;
    // Create a new goal to prevent mutating the suggestions list.
    const goal = goalTypeToGoal(this.props.suggestions[0]?.goalType);
    return (
      <Button
        style={timelineStyle.centerButton as any}
        color={"primary"}
        variant={"contained"}
        disabled={done}
        onClick={() => {
          this.props.chooseGoal(goal);
        }}
      >
        <Typography variant={"h4"}>
          <Translate id={done ? "goal.selector.done" : goal.name + ".title"} />
        </Typography>
      </Button>
    );
  }

  renderPortrait() {
    return (
      <React.Fragment>
        {/* Alternatives */}
        <div style={{ ...timelineStyle.paneStyling, float: "right" } as any}>
          <HorizontalDisplay
            data={this.createSuggestionData()}
            scrollToEnd={false}
            handleChange={this.handleChange}
            width={100}
            numPanes={3}
          />
        </div>

        {/* Recommendation */}
        <div style={timelineStyle.paneStyling as any}>
          <Typography variant="h5">
            <Translate id={"goal.selector.present"} />
          </Typography>
          <div
            style={{
              ...(timelineStyle.paneStyling as any),
              width: "80%",
              height: 50,
            }}
          >
            {this.goalButton()}
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderLandscape() {
    return (
      <GridList cols={this.state.reducedLandScape ? 6 : 8} cellHeight="auto">
        {/* Alternatives */}
        <GridListTile cols={2}>
          <div style={{ ...timelineStyle.paneStyling, float: "right" } as any}>
            <Typography variant="h6">
              <Translate id={"goal.selector.other"} />
            </Typography>
            <VerticalDisplay
              data={this.createSuggestionData()}
              scrollToEnd={false}
              handleChange={this.handleChange}
              height={35}
              numPanes={3}
            />
          </div>
        </GridListTile>

        {/* Recommendation */}
        <GridListTile cols={2} style={timelineStyle.paneStyling as any}>
          <Typography variant="h5">
            <Translate id={"goal.selector.present"} />
          </Typography>
          {this.goalButton()}
        </GridListTile>

        {/* History */}

        <GridListTile cols={2}>
          <div style={timelineStyle.paneStyling as any}>
            <Typography variant="h6">
              <Translate id={"goal.selector.past"} />
            </Typography>
            <VerticalDisplay
              data={[...this.props.history].reverse()}
              scrollToEnd={false}
              handleChange={this.handleChange}
              height={35}
              numPanes={3}
            />
          </div>
        </GridListTile>
      </GridList>
    );
  }

  render() {
    return this.state.portrait ? this.renderPortrait() : this.renderLandscape();
  }
}
