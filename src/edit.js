// MyCustomBlockEdit.js

import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { PanelBody, RangeControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React from "react";

function MyCustomBlockEdit({ attributes, setAttributes, clientId }) {
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
}

export default MyCustomBlockEdit;
