import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, $getRoot, TextNode } from "lexical";
import { useEffect } from "react";
import { useTextEditorContext } from "../..";
import { $convertFromMarkdownString } from "@lexical/markdown";
import { TRANSFORMERS } from "@lexical/markdown";

export default function InitData({ data }: { data?: string }) {
  const [editor] = useLexicalComposerContext();
  const { updateValue, inputType } = useTextEditorContext();
  useEffect(() => {
    const init = async () => {
      if (data) {
        await plainTextToLexicalState(data);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const init = async () => {
      if (updateValue) {
        await plainTextToLexicalState(updateValue);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateValue]);
  async function plainTextToLexicalState(text: string): Promise<string> {
    return new Promise((resolve) => {
      editor.registerUpdateListener(({ editorState }) => {
        resolve(JSON.stringify(editorState));
      });

      editor.update(() => {
        const paragraph = $createParagraphNode();
        let textNode: TextNode = $createTextNode("");
        if (inputType === "markdown") {
          textNode = $createTextNode(text);
          paragraph.append(textNode);
          $getRoot().clear().append(paragraph);
          $convertFromMarkdownString(text, TRANSFORMERS);
          return;
        }
        textNode = $createTextNode(text);
        paragraph.append(textNode);
        $getRoot().clear().append(paragraph);
        return;
      });
    });
  }
  return null;
}
