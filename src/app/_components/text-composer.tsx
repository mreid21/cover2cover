/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import {
  useEditor,
  EditorContent,
  type EditorOptions,
  type Content,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDebouncedCallback } from "use-debounce";

type TextComposerProps = {
  initialContent?: string;
  onUpdate: EditorOptions["onUpdate"];
};

export default function TextComposer({
  initialContent,
  onUpdate,
}: TextComposerProps) {
  const debouncedOnUpdate = useDebouncedCallback(onUpdate, 1000);
  const editor = useEditor({
    extensions: [StarterKit],
    onCreate: ({ editor }) => {
      if (initialContent)
        editor.commands.setContent(JSON.parse(initialContent) as Content);
    },
    onUpdate: debouncedOnUpdate,
    editorProps: {
      attributes: {
        class: "prose prose-p:m-0 prose-p:leading-6 focus:outline-none",
      },
    },
  });

  return <EditorContent className="h-full overflow-y-auto flex-1 p-4" editor={editor} />;
}
