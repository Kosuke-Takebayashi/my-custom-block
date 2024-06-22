import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";
import MyCustomBlockEdit from "./edit";
import "./editor.css";
import "./style.css";

registerBlockType("my-custom/block", {
    title: __("My Custom Block"),
    icon: "smiley",
    category: "widgets",
    description: __("A custom block for displaying a list of posts."),
    supports: {
        color: {
            background: false,
            text: true,
        },
        html: false,
        typography: {
            fontSize: true,
        },
    },
    attributes: {
        fontSize: {
            type: "number",
            default: 16,
        },
        date: {
            type: "boolean",
            default: true,
        },
        postsToShow: {
            type: "number",
            default: 4, // デフォルトの表示件数を設定
        },
        selectedOption: {
            type: "string",
            default: "Y-m-d", // デフォルトの表示件数を設定
        },
        layoutStyle: {
            type: "string",
            default: "one-column",
        },
    },
    edit: MyCustomBlockEdit,
    save() {
        return null;
    },
});
