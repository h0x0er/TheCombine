import { Button, Grid, Typography } from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@material-ui/icons";
import React, { ReactElement } from "react";

import { TreeSemanticDomain } from "types/semanticDomain";

export enum Direction {
  Down,
  Left,
  Right,
  Up,
}

interface DomainTileProps {
  domain: TreeSemanticDomain;
  onClick: (domain: TreeSemanticDomain) => void;
  direction?: Direction | undefined;
}

// Creates a semantic domain tile, which can be clicked on to navigate to that semantic domain
export default class DomainTile extends React.Component<DomainTileProps> {
  domainText(domain: TreeSemanticDomain): ReactElement {
    return (
      <div style={{ textTransform: "capitalize" }}>
        <Typography variant={"overline"}>{domain.id}</Typography>
        <Typography variant={"body1"}>{domain.name}</Typography>
      </div>
    );
  }

  textWithArrow(
    domain: TreeSemanticDomain,
    direction: Direction | undefined
  ): ReactElement {
    switch (direction) {
      case Direction.Down:
        return (
          <div>
            {this.domainText(domain)}
            <KeyboardArrowDown />
          </div>
        );
      case Direction.Left:
        return (
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
            wrap="nowrap"
          >
            <Grid item>
              <ChevronLeft />
            </Grid>
            <Grid item>{this.domainText(domain)}</Grid>
          </Grid>
        );
      case Direction.Right:
        return (
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
            wrap="nowrap"
          >
            <Grid item>{this.domainText(domain)}</Grid>
            <Grid item>
              <ChevronRight />
            </Grid>
          </Grid>
        );
      case Direction.Up:
        return (
          <div>
            <KeyboardArrowUp />
            {this.domainText(domain)}
          </div>
        );
      default:
        return <div>{this.domainText(domain)}</div>;
    }
  }

  render() {
    const domain = this.props.domain;
    return (
      <Button
        id={domain.id}
        color={"primary"}
        variant={"outlined"}
        style={{
          left: 0,
          bottom: 0,
          width: "95%",
          height: "95%",
          margin: "2.5%",
        }}
        onClick={() => this.props.onClick(domain)}
      >
        {this.textWithArrow(domain, this.props.direction)}
      </Button>
    );
  }
}
