<?php
/**
 * Plugin Name: Aprecap Bridge v2 (TEMPORAL — se elimina tras el respaldo)
 * Description: 1) Autenticación de rescate, 2) expone lp_lesson/lp_quiz/lp_question + respuestas en REST,
 *              3) volcado completo de la BD con clave. TEMPORAL.
 * Version: 1.0.0
 * License: GPL2
 */

// --- 1) Autenticación de rescate (clave temporal). ---
add_filter(
	'rest_authentication_errors',
	function ( $result ) {
		if ( isset( $_GET['aprecap_rescue'] ) && hash_equals( 'x9QpT2wVmN6kLdRz', $_GET['aprecap_rescue'] ) ) {
			$user = get_user_by( 'id', 1 );
			if ( $user ) {
				wp_set_current_user( $user->ID, $user->user_login );
				$result = true;
			}
		}
		return $result;
	},
	99
);

// --- 2) Exponer post types LearnPress en wp/v2. ---
add_action(
	'init',
	function () {
		foreach ( array( 'lp_lesson', 'lp_question', 'lp_quiz' ) as $pt ) {
			$obj = get_post_type_object( $pt );
			if ( $obj ) {
				$obj->show_in_rest = true;
				$obj->rest_base    = $pt;
			}
		}
	},
	99
);

// --- 3) Respuestas (_lp_answers) en la respuesta REST de preguntas. ---
add_action(
	'rest_api_init',
	function () {
		register_rest_field(
			'lp_question',
			'lp_answers',
			array(
				'get_callback' => function ( $v ) {
					$answers = get_post_meta( $v['id'], '_lp_answers', true );
					return is_array( $answers ) ? array_values( $answers ) : array();
				},
				'schema'       => array( 'type' => 'array', 'items' => array( 'type' => 'object' ) ),
			)
		);
	}
);

// --- 4) Volcado completo de la BD (backup) con clave. ---
add_action(
	'wp_loaded',
	function () {
		if ( ! isset( $_GET['aprecap_dump'] ) || ! hash_equals( 'k3yDump22xX', $_GET['aprecap_dump'] ) ) {
			return;
		}
		header( 'Content-Type: application/json; charset=utf-8' );
		global $wpdb;
		$out   = array( 'generado' => gmdate( 'c' ), 'tables' => array() );
		$tabs  = $wpdb->get_col( 'SHOW TABLES' );
		foreach ( $tabs as $t ) {
			$rows = $wpdb->get_results( "SELECT * FROM `{$t}`", ARRAY_A );
			$out['tables'][ $t ] = $rows ? $rows : array();
		}
		echo wp_json_encode( $out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
		exit;
	},
	5
);