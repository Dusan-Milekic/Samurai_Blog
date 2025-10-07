import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypePrism from "rehype-prism-plus";

interface MarkdownRenderProps {
    content: string;
}

export default function MarkdownRender({ content }: MarkdownRenderProps) {
    return (
        <div
            className="content"
            style={{
                backgroundColor: "#0d0d0d",
                color: "#f5f5f5",
                padding: "2rem",
                borderRadius: "10px",
                border: "1px solid #b30000",
                boxShadow: "0 0 20px rgba(179,0,0,0.3)",
                lineHeight: "1.8",
            }}
        >
            <ReactMarkdown
                children={content}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize, rehypePrism]}
            />
        </div>
    );
}
