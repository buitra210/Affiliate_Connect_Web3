import { Box } from "@mui/material";

import { $getRoot, EditorState } from "lexical";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

//EDITOR PLUGIN ****************************************************************
import { InitialConfigType, LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import { HashtagNode } from "@lexical/hashtag";
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import LexicalClickableLinkPlugin from "@lexical/react/LexicalClickableLinkPlugin";
// import { CharacterLimitPlugin } from "@lexical/react/LexicalCharacterLimitPlugin";
import { OverflowNode } from "@lexical/overflow";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
//MARK DOWN
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkNode } from "@lexical/link";

import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import StyleWraper from "./StyleWraper";
import ToolbarPlugin from "./Components/ToolBar";
import { $convertToMarkdownString } from "@lexical/markdown";
import InitData from "./Components/InitData";
import LimitTextIndicator from "../LimitTextIndicator/LimitText";

type Props = {
  initValue?: string;
  // eslint-disable-next-line no-unused-vars
  onValueChange: (value: string) => void;
  outputType?: "markdown" | "text";
  children?: ReactNode;
  updateValue?: string;
  inputType?: "markdown" | "text";
  limit?: number;
  viewMode?: boolean;
  placeholder?: string;
} & PropsWithChildren;

const theme: InitialConfigType["theme"] = {
  text: {
    bold: "text-bold",
    italic: "text-italic",
    underline: "text-underline",
    code: "text-code",
    highlight: "text-highlight",
    strikethrough: "text-strikethrough",
    subscript: "text-subscript",
    superscript: "text-superscript",
  },
  hashtag: "text-hashtag",
};

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError() {
  //ignore
}

function Editor() {
  const { onValueChange, children, initValue, outputType, limit, viewMode, placeholder } =
    useTextEditorContext();
  const [length, setLength] = useState<number>(0);
  const initialConfig: InitialConfigType = {
    namespace: "PlatformEditor",
    theme,
    onError,
    nodes: [
      LinkNode,
      HashtagNode,
      HeadingNode,
      QuoteNode,
      CodeNode,
      ListNode,
      ListItemNode,
      LinkNode,
      OverflowNode,
    ],
    editable: !viewMode,
  };

  const urlRegExp = new RegExp(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/
  );
  function validateUrl(url: string): boolean {
    return url === "https://" || urlRegExp.test(url);
  }

  function onChange(editorState: EditorState) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();

      if (outputType === "markdown") {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        onValueChange && onValueChange(markdown?.replaceAll("\n\n", "\n"));
        setLength(markdown?.replaceAll("\n\n", "\n").length);
        return;
      }
      onValueChange && onValueChange(root.getTextContent()?.replaceAll("\n\n", "\n"));
      setLength(root.getTextContent()?.replaceAll("\n\n", "\n").length);
      return;
    });
  }

  return (
    <Box className="text-container">
      <LexicalComposer initialConfig={initialConfig}>
        <InitData data={initValue} />
        <HashtagPlugin />
        <ListPlugin />
        <ToolbarPlugin />
        <LinkPlugin validateUrl={validateUrl} />
        <RichTextPlugin
          contentEditable={<ContentEditable className="input-container" />}
          placeholder={
            <Box className="text-placeholder">
              {placeholder === undefined ? "Enter text here" : placeholder}
            </Box>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
        <LexicalClickableLinkPlugin />
        {limit && (
          <Box sx={{ ml: 1 }}>
            <LimitTextIndicator limit={limit} remainingNumber={limit - length} />
          </Box>
        )}
      </LexicalComposer>
      {children}
    </Box>
  );
}

export default function TextEditor(props: Props) {
  const {
    initValue,
    onValueChange,
    outputType,
    children,
    updateValue,
    inputType,
    limit,
    viewMode,
    placeholder,
  } = props;
  const contextData = useMemo(() => {
    return {
      initValue,
      onValueChange,
      outputType,
      children,
      updateValue,
      inputType,
      limit,
      viewMode,
      placeholder,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, outputType, onValueChange, updateValue, inputType, viewMode, placeholder]);
  return (
    <TextEditorContext.Provider value={contextData}>
      <StyleWraper>
        <Editor />
      </StyleWraper>
    </TextEditorContext.Provider>
  );
}

const TextEditorContext = createContext<Props>({} as Props);
export const useTextEditorContext = () => useContext(TextEditorContext);
