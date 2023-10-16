import { CheckIcon, CopyIcon } from "lucide-react";
import { ButtonHTMLAttributes, useState } from "react";

import { cn } from "@/lib/cn";

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onCopy: () => void;
}

export default function CopyButton({ className, onCopy, ...props }: CopyButtonProps) {
  const [checked, setChecked] = useState(false);
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(null);
  const iconStyle = "w-3.5 h-3.5 animate-in fade-in";

  const onClick = () => {
    if (currentTimeout) clearTimeout(currentTimeout);
    onCopy();
    setChecked(true);
    setCurrentTimeout(setTimeout(() => setChecked(false), 1500));
  };

  return (
    <button
      className={cn(
        "p-2 rounded transition-opacity opacity-0 z-[2] group-hover:opacity-100",
        className,
      )}
      aria-label="Copy Text"
      onClick={onClick}
      {...props}
    >
      {checked ? <CheckIcon className={iconStyle} /> : <CopyIcon className={iconStyle} />}
    </button>
  );
}
