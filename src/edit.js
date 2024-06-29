import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";
import { PanelBody, RangeControl, ToggleControl, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import React, { useState, useEffect } from "react";

function MyCustomBlockEdit({ attributes, setAttributes, clientId }) {
    const [localPostsToShow, setLocalPostsToShow] = useState(attributes.postsToShow);
    const [localSelectedOption, setLocalSelectedOption] = useState(attributes.selectedOption);
    const [localLayoutStyle, setLocalLayoutStyle] = useState(attributes.layoutStyle);
    const [localThumbnail, setLocalThumbnail] = useState(attributes.thumbnail);

    const blockProps = useBlockProps({ style: { fontSize: attributes.fontSize } });

    useEffect(() => {
        // 属性の更新を反映
        setAttributes({ postsToShow: localPostsToShow });
    }, [localPostsToShow, setAttributes]);

    useEffect(() => {
        setAttributes({ selectedOption: localSelectedOption });
    }, [localSelectedOption]);

    useEffect(() => {
        setAttributes({ layoutStyle: localLayoutStyle });
    }, [localLayoutStyle]);

    useEffect(() => {
        setAttributes({ thumbnail: localThumbnail });
    }, [localThumbnail]);

    const recentPosts = useSelect(
        (select) => {
            const posts = select("core").getEntityRecords("postType", "post", {
                per_page: localPostsToShow,
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
        },
        [localPostsToShow]
    );

    // 日付フォーマットの関数
    const formatDate = (date, format) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        };
        const formatter = new Intl.DateTimeFormat("ja-JP", options);
        const parts = formatter.formatToParts(date);

        switch (format) {
            case "Y-m-d":
                return `${parts[0].value}-${parts[2].value}-${parts[4].value}`;
            case "Y.m.d":
                return `${parts[0].value}.${parts[2].value}.${parts[4].value}`;
            case "Y年m月d日":
                return `${parts[0].value}年${parts[2].value}月${parts[4].value}日`;
            case "Y/m/d":
                return `${parts[0].value}/${parts[2].value}/${parts[4].value}`;
            default:
                return `${parts[0].value}-${parts[2].value}-${parts[4].value}`;
        }
    };

    // セレクトボックスで選択できるオプション
    const selectOptions = [
        { value: "Y-m-d", label: "Y-m-d" },
        { value: "Y.m.d", label: "Y.m.d" },
        { value: "Y年m月d日", label: "Y年m月d日" },
        { value: "Y/m/d", label: "Y/m/d" },
    ];

    const layoutStyles = [
        { value: "one-column", label: "1カラム" },
        { value: "two-column", label: "2カラム" },
        { value: "three-column", label: "3カラム" },
    ];

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__("Font Size")}>
                    <RangeControl label={__("フォントサイズ")} value={attributes.fontSize} onChange={(fontSize) => setAttributes({ fontSize })} min={12} max={36} />
                    <ToggleControl label={__("投稿日")} checked={attributes.date} onChange={(date) => setAttributes({ date })} />
                    <ToggleControl label={__("サムネイル")} checked={attributes.thumbnail} onChange={(thumbnail) => setAttributes({ thumbnail })} />
                    <RangeControl
                        label={__("表示投稿数")}
                        value={localPostsToShow}
                        onChange={(value) => setLocalPostsToShow(value)}
                        min={1}
                        max={10} // 任意の最大値を設定
                    />
                    <SelectControl label={__("日付表示フォーマット")} value={localSelectedOption} options={selectOptions} onChange={(selectedOption) => setLocalSelectedOption(selectedOption)} />
                    <SelectControl label={__("レイアウトスタイル")} value={localLayoutStyle} options={layoutStyles} onChange={(layoutStyle) => setLocalLayoutStyle(layoutStyle)} />
                </PanelBody>
            </InspectorControls>

            <ul className={`wp-block-my-custom-block ${localLayoutStyle}`}>
                {recentPosts &&
                    recentPosts.map((post) => (
                        <li key={post.id}>
                            {attributes.thumbnail && post._embedded["wp:featuredmedia"] && (
                                <div className="thumbnail-img-wrapper">
                                    <img className="" src={post._embedded["wp:featuredmedia"][0].source_url} alt={post.title.rendered} />
                                </div>
                            )}
                            {attributes.date && <span className="my-custom-block-post-date">{formatDate(new Date(post.date), localSelectedOption)}</span>}
                            <span className="my-custom-block-category">{post.categories}</span>
                            <a href={post.link}>{post.title.rendered}</a>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default MyCustomBlockEdit;
