import React from "react";
import { LivePreview, LiveProvider, LiveError } from "react-live";
import { clsx } from "@nextui-org/shared-utils";
import * as Components from "@nextui-org/react";

import { BgGridContainer } from "@/components/bg-grid-container";

export interface ReactLiveDemoProps {
  code: string;
  noInline?: boolean;
  height?: string | number;
  isCentered?: boolean;
  className?: string;
  overflow?: "auto" | "visible" | "hidden";
}

export const scope = {
  ...Components,
} as Record<string, unknown>;

export const ReactLiveDemo: React.FC<ReactLiveDemoProps> = ({
  code,
  isCentered = false,
  height,
  className,
  noInline,
}) => {
  const content = (
    <>
      <LivePreview
        className={clsx("live-preview flex h-full w-full not-prose", {
          "justify-center items-center": isCentered,
        })}
        style={{ height }}
      />
      <LiveError />
    </>
  );

  return (
    <LiveProvider code={code} noInline={noInline} scope={scope}>
      <BgGridContainer className={className}>{content}</BgGridContainer>
    </LiveProvider>
  );
};
