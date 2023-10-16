import { useCallback, useMemo } from "react";
import createTheme, { CreateThemeOptions } from "@uiw/codemirror-themes";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";

import { loadExtensions } from "./utils";
import { myTheme } from "./codeblock.theme";
import CopyButton from "./copy-button";

export interface CodeBlockProps {
  title?: string;
  language: string;
  content: string;
  readOnly: boolean;
  onChange?: ReactCodeMirrorProps["onChange"];
  theme?: CreateThemeOptions;
  className?: string;
  height?: string;
  allowCopy?: boolean;
}

export default function CodeBlock({
  title,
  content,
  language,
  readOnly,
  onChange,
  theme,
  height,
  allowCopy = true,
}: CodeBlockProps) {
  const _theme = createTheme(theme ?? myTheme);
  const extensions = useMemo(() => loadExtensions(language), [language]);

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
  }, []);

  return (
    <div className="relative group border rounded text-sm bg-black px-4 py-4" data-code-fragment>
      {title ? (
        <div className="flex flex-row items-center bg-muted px-2 py-1.5 border-b">
          <span className="pl-2 flex-1 text-muted-foreground">{title}</span>
          {allowCopy && <CopyButton onCopy={onCopy} />}
        </div>
      ) : (
        allowCopy && (
          <CopyButton
            className="absolute top-2 right-2 bg-secondary text-secondary-foreground rounded"
            onCopy={onCopy}
          />
        )
      )}
      <CodeMirror
        value={content}
        extensions={extensions}
        readOnly={readOnly}
        onChange={onChange}
        theme={_theme}
        height={height}
        style={{ fontSize: 12 }}
      />
    </div>
  );
}
