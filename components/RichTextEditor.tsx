import React, { useState, useRef, useEffect } from "react";
import { Button, Tooltip } from "antd";
import {
  BoldOutlined,
  UnderlineOutlined,
  FontSizeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import styles from "../styles/RichTextEditor.module.css";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

type TextFormat = "normal" | "title" | "subtitle" | "bold" | "underline";

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value = "",
  onChange,
  placeholder = "Write content with formatting...",
  rows = 6,
  className = "",
}) => {
  const [content, setContent] = useState(value);
  const [selectedFormat, setSelectedFormat] = useState<TextFormat>("normal");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(value);
  }, [value]);

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onChange?.(newContent);
  };

  const applyFormat = (format: TextFormat) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    if (selectedText) {
      let formattedText = "";

      switch (format) {
        case "bold":
          formattedText = `**${selectedText}**`;
          break;
        case "underline":
          formattedText = `__${selectedText}__`;
          break;
        case "title":
          formattedText = `# ${selectedText}`;
          break;
        case "subtitle":
          formattedText = `## ${selectedText}`;
          break;
        case "normal":
          formattedText = selectedText;
          break;
      }

      const newContent =
        content.substring(0, start) + formattedText + content.substring(end);
      handleContentChange(newContent);

      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + formattedText.length,
          start + formattedText.length
        );
      }, 0);
    } else {
      // If no text is selected, insert format markers at cursor position
      let formatMarkers = "";
      switch (format) {
        case "bold":
          formatMarkers = "****";
          break;
        case "underline":
          formatMarkers = "____";
          break;
        case "title":
          formatMarkers = "# ";
          break;
        case "subtitle":
          formatMarkers = "## ";
          break;
        case "normal":
          return;
      }

      const newContent =
        content.substring(0, start) + formatMarkers + content.substring(end);
      handleContentChange(newContent);

      // Position cursor between markers for bold/underline
      setTimeout(() => {
        textarea.focus();
        if (format === "bold" || format === "underline") {
          textarea.setSelectionRange(start + 2, start + 2);
        } else {
          textarea.setSelectionRange(
            start + formatMarkers.length,
            start + formatMarkers.length
          );
        }
      }, 0);
    }

    setSelectedFormat(format);
  };

  const formatButtons = [
    { key: "normal", label: "Normal", icon: <EditOutlined /> },
    { key: "title", label: "Title", icon: <FontSizeOutlined /> },
    { key: "subtitle", label: "Subtitle", icon: <FontSizeOutlined /> },
    { key: "bold", label: "Bold", icon: <BoldOutlined /> },
    { key: "underline", label: "Underline", icon: <UnderlineOutlined /> },
  ] as const;

  return (
    <div className={`${styles["rich-text-editor"]} ${className}`}>
      {/* Formatting Toolbar */}
      <div className={styles.toolbar}>
        {formatButtons.map(({ key, label, icon }) => (
          <Tooltip key={key} title={label}>
            <Button
              size="small"
              type={selectedFormat === key ? "primary" : "default"}
              icon={icon}
              onClick={() => applyFormat(key as TextFormat)}
              className={`${selectedFormat === key ? styles.active : ""}`}
            >
              {label}
            </Button>
          </Tooltip>
        ))}
      </div>

      {/* Text Area */}
      <textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => handleContentChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        style={{
          fontFamily: "inherit",
          lineHeight: "1.5",
          minHeight: `${rows * 1.5}rem`,
        }}
      />

      {/* Formatting Help */}
      <div className={styles["help-text"]}>
        <strong>Formatting Guide:</strong>
        <ul>
          <li>
            <strong>Bold:</strong> **text** or select text and click Bold
          </li>
          <li>
            <strong>Underline:</strong> __text__ or select text and click
            Underline
          </li>
          <li>
            <strong>Title:</strong> # text or select text and click Title
          </li>
          <li>
            <strong>Subtitle:</strong> ## text or select text and click Subtitle
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RichTextEditor;
