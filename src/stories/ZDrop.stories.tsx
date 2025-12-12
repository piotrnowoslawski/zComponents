import type { Meta } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import SurvivorsNumbers from "@stories/ZComponents/ZDrop/stories/numbers/SurvivorsNumbers";
import WeaponsNumbers from "@stories/ZComponents/ZDrop/stories/numbers/WeaponsNumbers";
import ZombiesNumbers from "@stories/ZComponents/ZDrop/stories/numbers/ZombiesNumbers";
import SurvivorsStrings from "@stories/ZComponents/ZDrop/stories/strings/SurvivorsStrings";
import WeaponsStrings from "@stories/ZComponents/ZDrop/stories/strings/WeaponsStrings";
import ZombiesStrings from "@stories/ZComponents/ZDrop/stories/strings/ZombiesStrings";
import WeaponsObjects from "@stories/ZComponents/ZDrop/stories/objects/WeaponsObjects";
import SurvivorsObjects from "./ZComponents/ZDrop/stories/objects/SurvivorsObjects";
import ZombiesObjects from "./ZComponents/ZDrop/stories/objects/ZombiesObjects";
import BasicSurvivorsNumbers from "./ZComponents/ZDrop/stories/basic/BasicSurvivorsNumbers";
import BasicWeaponsStrings from "./ZComponents/ZDrop/stories/basic/BasicWeaponsStrings";
import BasicZombiesObjects from "./ZComponents/ZDrop/stories/basic/BasicZombiesObjects";
import BasicZombiesCustomSearch from "./ZComponents/ZDrop/stories/basic/BasicCustomSearch";
import ReactHookFormIntegration from "./ZComponents/ZDrop/stories/integrations/ReactHookForm/ReactHookFormIntegration";
import ReactHookFormIntegrationMultiple from "./ZComponents/ZDrop/stories/integrations/ReactHookForm/ReactHookFormIntegrationMultiple";

const meta: Meta<typeof ZDrop> = {
  title: "Components/ZDrop",
  component: ZDrop,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const SurvivorsNumbersStory = {
  ...SurvivorsNumbers,
  name: "Fully custom design - numbers - survivor single select",
};

export const WeaponsNumbersStory = {
  ...WeaponsNumbers,
  name: "Fully custom design - numbers - weapon single select",
};

export const ZombiesNumbersStory = {
  ...ZombiesNumbers,
  name: "Fully custom design - numbers - zombies multiple select",
};

export const SurvivorsStringsStory = {
  ...SurvivorsStrings,
  name: "Fully custom design - strings - survivor single select",
};

export const WeaponsStringsStory = {
  ...WeaponsStrings,
  name: "Fully custom design - strings - weapon single select",
};

export const ZombiesStringsStory = {
  ...ZombiesStrings,
  name: "Fully custom design - strings - zombies multiple select",
};

export const SurvivorsObjectsStory = {
  ...SurvivorsObjects,
  name: "Fully custom design - objects -  survivor single select",
};

export const WeaponsObjectsStory = {
  ...WeaponsObjects,
  name: "Fully custom design - objects - weapon single select",
};

export const ZombiesObjectsStory = {
  ...ZombiesObjects,
  name: "Fully custom design - objects - zombies multiple select",
};

export const BasicSurvivorsNumbersStory = {
  ...BasicSurvivorsNumbers,
  name: "Basic - numbers - survivor single select",
};

export const BasicWeaponsStringsStory = {
  ...BasicWeaponsStrings,
  name: "Basic - strings - weapon single select",
};

export const BasicZombiesObjectsStory = {
  ...BasicZombiesObjects,
  name: "Basic - objects - zombies multiple select",
};

export const BasicZombiesCustomSearchStory = {
  ...BasicZombiesCustomSearch,
  name: "Basic - objects - zombies multiple select with custom search",
};

export const ReactHookFormIntegrationStory = {
  ...ReactHookFormIntegration,
  name: "Integration - React Hook Form",
};

export const ReactHookFormIntegrationMultipleStory = {
  ...ReactHookFormIntegrationMultiple,
  name: "Integration - React Hook Form Multiple",
};
