<?php
/**
 * Plugin Name: Aprecap Bridge (TEMPORAL — se elimina tras el respaldo)
 * Description: Expone post types LearnPress (lecciones, preguntas) en wp/v2 + acceso de rescate. TEMPORAL.
 * Version: 1.0.0
 * License: GPL2
 */

// 1) Autenticación de rescate (solo con la clave secreta temporal).
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

// 2) Habilitar REST para lp_lesson / lp_question (LearnPress los deshabilita).
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

// 3) Respuestas (postmeta _lp_answers) expuestas en la respuesta REST de preguntas.
add_action(
	'rest_api_init',
	function () {
		register_rest_field(
			'lp_question',
			'lp_answers',
			array(
				'get_callback' => function ( $v ) {
					$answers = get_post_meta( $v['id'], '_lp_answers', true );
					if ( ! is_array( $answers ) ) {
						return array();
					}
					return array_values( $answers );
				},
				'schema'       => array( 'type' => 'array', 'items' => array( 'type' => 'object' ) ),
			)
		);
	}
);

// 4) Trampa de errores fatales de TEMPLATE a archivo (temporal).
$GLOBALS['aprecap_err'] = dirname( __DIR__ ) . '/aprecap-errors.log';
add_action(
	'init',
	function () {
		ini_set( 'log_errors', '1' );
		ini_set( 'error_log', '/home/institutoaprecap/domains/aprecap.cl/public_html/aprecap-errors.log' );
	},
	1
);

add_action(
	'shutdown',
	function () {
		$e = error_get_last();
		if ( $e && isset( $e['type'] ) && ( E_ERROR | E_PARSE | E_CORE_ERROR | E_COMPILE_ERROR ) & $e['type'] ) {
			$line = gmdate( 'c' ) . ' ' . wp_json_encode( $e ) . "\n";
			$file = dirname( __DIR__ ) . '/aprecap-errors.log';
			file_put_contents( $file, $line, FILE_APPEND );
		}
	},
	1
);