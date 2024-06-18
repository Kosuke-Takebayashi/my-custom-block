import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
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
    },
    edit({ attributes, setAttributes, clientId }) {
        const blockProps = useBlockProps({ style: { fontSize: attributes.fontSize } });

        const recentPosts = useSelect((select) => {
            const posts = select("core").getEntityRecords("postType", "post", {
                per_page: 5,
                _embed: true,
            });

            if (posts) {
                return posts.map((post) => {
                    const categories = post._embedded?.["wp:term"]?.[0];
                    return {
                        ...post,
                        categories: categories ? categories.map((category) => category.name).join(", ") : "",
                    };
                });
            }
            return [];
        }, []);

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title={__("Font Size")}>
                        <RangeControl label={__("Font Size")} value={attributes.fontSize} onChange={(fontSize) => setAttributes({ fontSize })} min={12} max={36} />
                        <ToggleControl label={__("Display Date")} checked={attributes.date} onChange={(date) => setAttributes({ date })} />
                    </PanelBody>
                </InspectorControls>
                <ul>
                    {recentPosts &&
                        recentPosts.map((post) => (
                            <li key={post.id}>
                                {attributes.date && <span className="my-custom-block-post-date">{new Date(post.date).toLocaleDateString()}</span>}
                                <span className="my-custom-block-category">{post.categories}</span>
                                <a href={post.link}>{post.title.rendered}</a>
                            </li>
                        ))}
                </ul>
            </div>
        );
    },
    save() {
        return null;
    },
});
