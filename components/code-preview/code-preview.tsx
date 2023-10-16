import { Tab, Tabs } from "next-docs-ui/components/tabs";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@nextui-org/react";

import { useCodeDemo } from "./use-code-demo";
import CodeBlock from "./codeblock";

const DynamicReactLiveDemo = dynamic(() => import("./react-live-demo").then(m => m.ReactLiveDemo), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <Skeleton className="w-full h-24 rounded-xl" />,
});

interface CodePreviewProps {
  files: Record<string, string>;
  className?: string;
  previewHeight?: string;
  isPreviewCentered?: boolean;
  overflow?: "auto" | "visible" | "hidden";
}

const CodePreview = ({
  files,
  previewHeight = "auto",
  overflow = "visible",
  isPreviewCentered = false,
  className,
}: CodePreviewProps) => {
  const originalCode = files["/App.tsx"];

  const { noInline, code } = useCodeDemo({ files });
  const preview = useMemo(() => {
    return (
      <DynamicReactLiveDemo
        className={className ?? "rounded"}
        code={code}
        height={previewHeight}
        isCentered={isPreviewCentered}
        noInline={noInline}
        overflow={overflow}
      />
    );
  }, [previewHeight, overflow, isPreviewCentered, className]);

  return (
    <Tabs items={["Preview", "Code"]}>
      <Tab value="Preview">{preview}</Tab>
      <Tab value="Code">
        <CodeBlock className="rounded" content={originalCode} language="tsx" readOnly />
      </Tab>
    </Tabs>
  );
};
export default CodePreview;
