export function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Helper function to extract plain text from rich text content
export function getPlainTextFromRichText(content: any): string {
  if (!content?.root?.children) return "";

  return content.root.children
    .map((node: any) => {
      if (node.type === "paragraph") {
        return (
          node.children?.map((child: any) => child.text || "").join("") || ""
        );
      }
      return "";
    })
    .join(" ")
    .trim();
}
