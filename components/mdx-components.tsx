/* eslint-disable react/display-name */
import { clsx } from "@nextui-org/shared-utils";
import * as Components from "@nextui-org/react";
import NextImage from "next/image";
import { HelpCircle } from "lucide-react";
import { SafeLink } from "next-docs-zeta/link";
import { Tab as NDTab, Tabs as NDTabs } from "next-docs-ui/components/tabs";
import { Steps as NDSteps, Step as NDStep } from "next-docs-ui/components/steps";
import { File as NDFile, Files as NDFiles } from "next-docs-ui/components/files";
import { TypeTable as NDTable } from "next-docs-ui/components/type-table";
import { Pre as NDPre } from "next-docs-ui/mdx";

import { useTitle } from "@/utils/title-provider";
import { CodePreview, Codeblock } from "./code-preview";

const Table: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="border-collapse border-spacing-0 w-full">{children}</table>
    </div>
  );
};

const Thead: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <thead
      className={clsx(
        "[&>tr]:h-12",
        "[&>tr>th]:py-0",
        "[&>tr>th]:align-middle",
        "[&>tr>th]:bg-default-400/20",
        "dark:[&>tr>th]:bg-default-600/10",
        "[&>tr>th]:text-default-600 [&>tr>th]:text-xs",
        "[&>tr>th]:text-left [&>tr>th]:pl-2",
        "[&>tr>th:first-child]:rounded-l-lg",
        "[&>tr>th:last-child]:rounded-r-lg",
      )}
    >
      {children}
    </thead>
  );
};
const Trow: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <tr>{children}</tr>;
};

const Tcol: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <td className="text-sm p-2 max-w-[200px] overflow-auto whitespace-normal break-normal">
      {children}
    </td>
  );
};

export interface LinkedHeadingProps {
  as: keyof JSX.IntrinsicElements;
  id?: string;
  linked?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const List: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <ul className="list-disc flex flex-col gap-2 ml-4 mt-2 [&>li>strong]:text-pink-500 dark:[&>li>strong]:text-cyan-600">
      {children}
    </ul>
  );
};

const Code = ({ className, children }: { children?: React.ReactNode; className?: string }) => {
  return children;
};

const Link = ({ href, children }: { href?: string; children?: React.ReactNode }) => {
  const isExternal = href?.startsWith("http");
  return (
    <Components.Link href={href} isExternal={isExternal} showAnchorIcon={isExternal}>
      {children}
    </Components.Link>
  );
};

const NDComponents = {
  NDTabs,
  NDTab,
  NDSteps,
  NDStep,
  NDFiles,
  NDFile,
  NDTable,
  NDPre,
};

const CustomComponents = {
  CodePreview,
  Codeblock,
};

export const MDXComponents = {
  /**
   * Next.js components
   */
  NextImage,
  /**
   * NextUI components
   */
  ...Components,
  /**
   * Docs components
   */
  ...NDComponents,
  /**
   * Markdown components
   */
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-medium" {...props} />
  ),
  table: Table,
  thead: Thead,
  tr: Trow,
  td: Tcol,
  ul: List,
  code: Code,
  a: (props: React.HTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
  kbd: (props: React.HTMLAttributes<HTMLElement>) => (
    <Components.Kbd {...props} className="py-0.5 px-1.5" />
  ),
  /**
   * Custom
   */
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step [&>h3>a]:pt-0.5 mb-12 ml-4 relative border-l border-default-100 pl-[1.625rem] [counter-reset:step]"
      {...props}
    />
  ),
  Question: ({ id }: { id: string }) => {
    const title = useTitle(id);
    return (
      <>
        &nbsp;
        <span className="whitespace-nowrap">
          <HelpCircle size="18" className="inline-block text-daw-zinc-600 mr-1" />
          &nbsp;
        </span>
        <SafeLink href={`/${id}`}>{title}</SafeLink>
      </>
    );
  },
  ...CustomComponents,
} as unknown as Record<string, React.ReactNode>;
