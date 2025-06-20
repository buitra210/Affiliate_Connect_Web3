import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { Box, IconButton } from "@mui/material";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";

import { $createQuoteNode } from "@lexical/rich-text";
import { INSERT_UNORDERED_LIST_COMMAND, INSERT_ORDERED_LIST_COMMAND } from "@lexical/list";
import { useCallback, useEffect, useRef, useState } from "react";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";

//ICON*************************************************************************************************
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { useTextEditorContext } from "../..";

const LowPriority = 1;

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const { outputType } = useTextEditorContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikeThrough, setIsStrikeThrough] = useState(false);
  const isMd = outputType === "markdown";
  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikeThrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  };
  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        // eslint-disable-next-line no-unused-vars
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);

  return (
    <>
      {isMd && (
        <Box
          className="toolbar-container"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            backgroundColor: "background.paper",
          }}
          ref={toolbarRef}
        >
          <IconButton
            sx={{ backgroundColor: "background.active" }}
            disabled={!canUndo}
            onClick={() => {
              editor.dispatchCommand(UNDO_COMMAND, undefined);
            }}
          >
            <UndoIcon />
          </IconButton>
          <IconButton
            disabled={!canRedo}
            onClick={() => {
              editor.dispatchCommand(REDO_COMMAND, undefined);
            }}
          >
            <RedoIcon />
          </IconButton>
          <IconButton
            className={isBold ? "active" : ""}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            }}
          >
            <FormatBoldIcon />
          </IconButton>
          <IconButton
            className={isItalic ? "active" : ""}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            }}
          >
            <FormatItalicIcon />
          </IconButton>
          <IconButton
            className={isUnderline ? "active" : ""}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            }}
          >
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton
            className={isStrikeThrough ? "active" : ""}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
            }}
          >
            <StrikethroughSIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
            }}
          >
            <FormatAlignLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
            }}
          >
            <FormatAlignCenterIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
            }}
          >
            <FormatAlignRightIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
            }}
          >
            <FormatListBulletedIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            }}
          >
            <FormatListNumberedIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              formatQuote();
            }}
          >
            <FormatQuoteIcon />
          </IconButton>
        </Box>
      )}
    </>
  );
}
