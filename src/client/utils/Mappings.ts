import Heading from "../../shared/enums/Heading";
import StandingFrame from "../enums/StandingFrame";

const TAG = "[Mappings]";

export function directionToHeading(direction: string): Heading {
  switch (direction) {
    case "down":
      return Heading.DOWN;
    case "up":
      return Heading.UP;
    case "left":
      return Heading.LEFT;
    case "right":
      return Heading.RIGHT;
  }

  return Heading.NONE;
}

export function headingToDirection(heading: Heading): string {
  switch (heading) {
    case Heading.DOWN:
      return "down";
    case Heading.UP:
      return "up";
    case Heading.LEFT:
      return "left";
    case Heading.RIGHT:
      return "right";
  }

  return "";
}

export function getStandingFrame(heading: Heading): StandingFrame {
  let standingFrame = 1;

  if (heading === Heading.DOWN) standingFrame = StandingFrame.DOWN;
  if (heading === Heading.UP) standingFrame = StandingFrame.UP;
  if (heading === Heading.LEFT) standingFrame = StandingFrame.LEFT;
  if (heading === Heading.RIGHT) standingFrame = StandingFrame.RIGHT;

  return standingFrame;
}
