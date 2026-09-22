import { Meta, StoryObj } from "@storybook/react";

import { useToast } from "~/shared/components/ui/toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/shared/components/ui/tooltip";
import * as icons from "~icons";

type Story = StoryObj<typeof AssetIcons>;

function AssetIcons() {
  const { toast } = useToast();

  const handleClickIcon = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${text} copied to clipboard`,
    });
  };

  return (
    <>
      <h2 className="mb-2 font-semibold">Click to copy!</h2>
      <TooltipProvider>
        <div className="flex flex-wrap items-center justify-center">
          {Object.entries(icons).map(([key, Icon]) => (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <div
                  className="cursor-pointer border-[0.5px] p-2 hover:bg-accent"
                  onClick={() => handleClickIcon(`<${key} />`)}
                >
                  <Icon className="text-lg" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="text-sm font-mono">
                <p>{`<${key} />`}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </>
  );
}

export default {
  title: "AssetIcons",
  component: AssetIcons,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AssetIcons>;

export const Primary: Story = {};
