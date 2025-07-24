"use client";

import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  highlightActiveLine,
  keymap,
  lineNumbers,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";

interface CodeViewerProps {
  code: string;
  language?: "javascript" | "typescript"; // You can expand this
}

export default function CodeViewer({ code, language = "typescript" }: CodeViewerProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: code,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          history(),
          javascript({ typescript: language === "typescript" }),
          EditorView.editable.of(false),
          EditorView.theme({
            "&": {
              backgroundColor: "#1e1e1e",
              color: "#d4d4d4",
              fontSize: "14px",
              borderRadius: "12px",
              padding: "16px",
              fontFamily: "'Fira Code', monospace",
              overflow: "auto",
            },
          }),
        ],
      }),
      parent: editorRef.current,
    });

    return () => view.destroy();
  }, [code, language]);

  return (
    <div className="rounded-xl overflow-auto shadow-lg" ref={editorRef} />
  );
}
