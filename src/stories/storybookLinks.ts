import { SelectType, StoryType } from "./types/visualComponentsTypes";

const BASE_STORY_PATH = "/story/components-zdrop";

const links = {
  numbers: {
    survivors: `${BASE_STORY_PATH}--survivors-numbers-story`,
    weapons: `${BASE_STORY_PATH}--weapons-numbers-story`,
    zombies: `${BASE_STORY_PATH}--zombies-numbers-story`,
  },
  strings: {
    survivors: `${BASE_STORY_PATH}--survivors-strings-story`,
    weapons: `${BASE_STORY_PATH}--weapons-strings-story`,
    zombies: `${BASE_STORY_PATH}--zombies-strings-story`,
  },
  objects: {
    survivors: `${BASE_STORY_PATH}--survivors-objects-story`,
    weapons: `${BASE_STORY_PATH}--weapons-objects-story`,
    zombies: `${BASE_STORY_PATH}--zombies-objects-story`,
  },
  basic: {
    survivors: `${BASE_STORY_PATH}--basic-survivors-numbers-story`,
    weapons: `${BASE_STORY_PATH}--basic-weapons-strings-story`,
    zombies: `${BASE_STORY_PATH}--basic-zombies-objects-story`,
  },
};

const navigateToStoryId = (selectType: SelectType, storyType: StoryType) => {
  if (typeof window === "undefined") return;

  const target = window.parent ?? window;
  const url = new URL(target.location.href);

  url.searchParams.set("path", `${links[storyType][selectType]}`);

  target.location.href = url.toString();
};

export const goToStory = (selectType: SelectType, storyType: StoryType) =>
  navigateToStoryId(selectType, storyType);
