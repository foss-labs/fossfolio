import { Editor } from "novel";
import { DashboardLayout } from "@app/layout";


const defaultEditorContent = {
    type: "doc",
    content: [
        {
            type: "heading",
            attrs: { level: 2 },
            content: [{ type: "text", text: "Add Your Event Info Here" }],
        },
    ]
}

const event = () => {


    return (
        <Editor className="w-full" defaultValue={defaultEditorContent} />
    )
}

event.Layout = DashboardLayout;
event.RequireAuth = true;
export default event