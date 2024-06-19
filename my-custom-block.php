<?php
/*
Plugin Name: My Custom Block
Description: A custom block plugin for displaying posts list.
Version: 1.0
Author: Your Name
*/

function my_custom_block_render_callback($block_attributes, $content)
{
    $recent_posts = wp_get_recent_posts(array(
        'numberposts' => $block_attributes['postsToShow'],
        'post_status' => 'publish',
    ));

    if (empty($recent_posts)) {
        return 'No posts';
    }

    $output = '<ul class="' . esc_attr($block_attributes['className']) . '" style="font-size: var(--font-size-' . intval($block_attributes['fontSize']) . ')">';
    foreach ($recent_posts as $post) {
        $post_categories = get_the_category($post['ID']);

        $output .= '<li>';

        // 投稿日の表示を制御
        if (!empty($block_attributes['date']) && $block_attributes['date']) {
            $output .= '<time class="my-custom-block-post-date" datetime="' . esc_attr(get_the_date('Y-m-d', $post['ID'])) . '">' . esc_html(get_the_date('Y-m-d', $post['ID'])) . '</time>';
        }

        // カテゴリーの表示
        if ($post_categories) {
            $categories_list = get_the_category_list(', ', '', $post['ID']);
            $output .= '<span class="my-custom-block-category">' . $categories_list . '</span>';
        }

        // 投稿タイトルの表示
        $output .= '<a href="' . esc_url(get_permalink($post['ID'])) . '">' . esc_html(get_the_title($post['ID'])) . '</a>';

        $output .= '</li>';
    }
    $output .= '</ul>';

    return $output;
}

// ブロックの登録
function my_custom_block_register_block()
{
    // エディター用のスクリプト
    wp_register_script(
        'my-custom-block-editor-script',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
    );

    // エディター用のスタイル
    wp_register_style(
        'my-custom-block-editor-style',
        plugins_url('build/index.css', __FILE__),
        array('wp-edit-blocks'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.css')
    );

    // フロントエンド用のスタイル
    wp_register_style(
        'my-custom-block-frontend-style',
        plugins_url('build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );

    // ブロックを登録
    register_block_type('my-custom/block', array(
        'editor_script' => 'my-custom-block-editor-script',
        'editor_style'  => 'my-custom-block-editor-style',
        'style'         => 'my-custom-block-frontend-style',
        'render_callback' => 'my_custom_block_render_callback',
        'attributes' => array(
            'fontSize' => array(
                'type' => 'number',
                'default' => 16,
            ),
            'date' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'postsToShow' => array(
                'type' => "number",
                'default' => 4,
            ),
        ),
    ));
}
add_action('init', 'my_custom_block_register_block');
