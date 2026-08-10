<?php
// Dump temporal DB de WordPress — se elimina tras su uso.
if ( ! isset( $_GET['k'] ) || ! hash_equals( 'dbKey9a1B2c3D', $_GET['k'] ) ) {
	http_response_code( 404 );
	exit;
}

$wp_base = dirname( __DIR__ ) . '/public_html';
if ( ! file_exists( $wp_base . '/wp-load.php' ) ) {
	$wp_base = dirname( __DIR__ );
}

require_once $wp_base . '/wp-load.php';

header( 'Content-Type: application/json; charset=utf-8' );

global $wpdb;

$post_types = array( 'lp_course', 'lp_lesson', 'lp_quiz', 'lp_question', 'lp_section' );
$place      = implode( ',', array_map( fn( $t ) => $wpdb->prepare( '%s', $t ), $post_types ) );

$rows = $wpdb->get_results(
	"SELECT ID, post_type, post_status, post_title, post_name, post_content, post_parent, post_date
     FROM {$wpdb->posts}
     WHERE post_type IN ( {$place} ) ORDER BY post_parent ASC, ID ASC",
	ARRAY_A
);

$meta_rows = $wpdb->get_results(
	"SELECT post_id, meta_key, meta_value FROM {$wpdb->postmeta}
     WHERE meta_key IN ('_lp_answers','_lp_duration','_lp_price','_lp_level','_lp_passing_grade','_lp_retake_count','_lp_review_questions','_lp_preview','_lp_permalink','_lp_course_result')
     ORDER BY post_id",
	ARRAY_A
);

$meta = array();
foreach ( $meta_rows as $m ) {
	$meta[ $m['post_id'] ][ $m['meta_key'] ] = maybe_unserialize( $m['meta_value'] );
}
foreach ( $rows as &$p ) {
	$p['meta']         = isset( $meta[ $p['ID'] ] ) ? $meta[ $p['ID'] ] : array();
	$p['post_content'] = wpautop( $p['post_content'] );
}
unset( $p );

echo wp_json_encode(
	array( 'generado' => gmdate( 'c' ), 'total_posts' => count( $rows ), 'posts' => $rows ),
	JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);