import { SandpackFiles, SandpackPredefinedTemplate } from "@codesandbox/sandpack-react";

export type HighlightedLines =
  | string
  | {
      [key in SandpackPredefinedTemplate]?: string;
    };

export type Language = "typescript" | "javascript";

export type HighlightedLine = {
  start?: number | string;
  end?: number | string;
  count?: number;
};

export type Decorators = Array<{
  className?: string;
  line: number;
  startColumn?: number;
  endColumn?: number;
  elementAttributes?: Record<string, string>;
}>;

export interface UseSandpackProps {
  files?: SandpackFiles;
  typescriptStrict?: boolean;
  template?: SandpackPredefinedTemplate;
  highlightedLines?: HighlightedLines;
}

export interface SandpackProps extends UseSandpackProps {
  showTabs?: boolean;
  // showPreview?: boolean;
  // showEditor?: boolean;
  // showCopyCode?: boolean;
  showReportBug?: boolean;
  defaultExpanded?: boolean;
  showOpenInCodeSandbox?: boolean;
  // children?: React.ReactNode;
}

export interface WindowResizerProps {
  resizeEnabled?: boolean;
  hideWindowActions?: boolean;
  iframeHeight?: string | number;
  iframeMinWidth?: number;
  iframeSrc?: string;
  iframeInitialWidth?: number;
  iframeTitle?: string;
}

export type FileCode = {
  fileName: string;
  code: string;
};
