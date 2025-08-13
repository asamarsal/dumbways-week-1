import { ReactNode } from "react";

interface TextTypeProps {
  text: string | string[];
  as?: string;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (text: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  [key: string]: unknown;
}

declare function TextType(props: TextTypeProps): ReactNode;

export default TextType;