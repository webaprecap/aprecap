<?php
/**
 * Plugin Name: Aprecap Dump (TEMPORAL — se elimina tras el respaldo)
 * Description: Exporta el curriculum completo de cursos LearnPress como JSON. TEMPORAL.
 * Version: 1.1.0
 * License: GPL2
 */

add_action(
	'wp_loaded',
	function () {
		if ( ! isset( $_GET['aprecap_dump'] ) || ! hash_equals( 'k3yDump22xX', $_GET['aprecap_dump'] ) ) {
			return;
		}
		header( 'Content-Type: application/json; charset=utf-8' );
		$out = array(
			'generado' => gmdate( 'c' ),
			'lp_ok'    => class_exists( 'LP_Course' ),
			'errores'  => array(),
			'cursos'   => array(),
		);

		if ( ! class_exists( 'LP_Course' ) ) {
			echo wp_json_encode( $out, JSON_UNESCAPED_UNICODE );
			exit;
		}

		try {
			$q = new WP_Query(
				array(
					'post_type'      => 'lp_course',
					'post_status'    => 'publish',
					'posts_per_page' => 100,
				)
			);
			$courses = array();
			foreach ( $q->posts as $p ) {
				$course = learn_press_get_course( $p->ID );
				if ( $course ) {
					$courses[] = $course;
				}
			}
		} catch ( \Throwable $e ) {
			$out['errores'][] = 'get_courses: ' . $e->getMessage();
			$courses          = array();
		}

		foreach ( (array) $courses as $course ) {
			if ( ! is_object( $course ) ) {
				continue;
			}
			$curso = array(
				'id'        => $course->get_id(),
				'slug'      => $course->get_slug(),
				'nombre'    => $course->get_title(),
				'duracion'  => null,
				'precio'    => null,
				'nivel'     => null,
				'secciones' => array(),
			);
			try {
				$curso['duracion'] = (string) $course->get_duration();
			} catch ( \Throwable $e ) {
			}
			try {
				$curso['precio'] = (string) $course->get_price();
			} catch ( \Throwable $e ) {
			}
			try {
				$curso['nivel']     = $course->get_level();
				$curso['contenido'] = $course->get_content();
			} catch ( \Throwable $e ) {
			}

			try {
				$curricu = $course->get_curriculum();
			} catch ( \Throwable $e ) {
				$out['errores'][] = 'curriculum ' . $course->get_id() . ': ' . $e->getMessage();
				$curricu          = array();
			}

			foreach ( $curricu as $seccion ) {
				$sec = array(
					'titulo' => ( is_object( $seccion ) && method_exists( $seccion, 'get_title' ) ) ? $seccion->get_title() : 'Sección',
					'items'  => array(),
				);
				$items = array();
				try {
					$items = $seccion->get_items();
				} catch ( \Throwable $e ) {
					$out['errores'][] = 'items sección: ' . $e->getMessage();
				}
				if ( ! is_array( $items ) ) {
					$items = array();
				}
				foreach ( $items as $item ) {
					if ( ! is_object( $item ) ) {
						continue;
					}
					$id   = (int) $item->get_id();
					$tipo = method_exists( $item, 'get_type' ) ? $item->get_type() : get_post_type( $id );
					$ent  = array(
						'id'    => $id,
						'tipo'  => $tipo,
						'titulo' => $item->get_title(),
						'slug'  => get_post_field( 'post_name', $id ),
					);
					if ( 'lp_lesson' === $tipo ) {
						try {
							$lesson              = learn_press_get_lesson( $id );
							$ent['contenido']    = $lesson ? $lesson->get_content() : '';
						} catch ( \Throwable $e ) {
							$ent['contenido']    = '';
							$out['errores'][]    = 'lesson ' . $id . ': ' . $e->getMessage();
						}
					} elseif ( 'lp_quiz' === $tipo ) {
						$ent['preguntas'] = array();
						$ent['config']    = array();
						try {
							$quiz               = learn_press_get_quiz( $id );
							$ent['config']      = $quiz ? $quiz->get_data() : array();
							$preguntas          = $quiz ? $quiz->get_questions() : array();
							foreach ( $preguntas as $q ) {
								if ( ! is_object( $q ) ) {
									continue;
								}
								$qid    = (int) $q->get_id();
								$pq     = array(
									'id'        => $qid,
									'titulo'    => $q->get_title(),
									'enunciado' => get_post_field( 'post_content', $qid ),
									'respuestas' => array(),
								);
								$answers = null;
								try {
									$answers = $q->get_answers();
								} catch ( \Throwable $e ) {
								}
								if ( is_object( $answers ) && method_exists( $answers, 'get_answers' ) ) {
									foreach ( $answers->get_answers() as $a ) {
										if ( ! is_object( $a ) ) {
											continue;
										}
										$correcta = false;
										try {
											$correcta = (bool) $a->is_correct();
										} catch ( \Throwable $e ) {
										}
										$pq['respuestas'][] = array(
											'texto'    => $a->get_title(),
											'correcta' => $correcta,
										);
									}
								}
								$ent['preguntas'][] = $pq;
							}
						} catch ( \Throwable $e ) {
							$out['errores'][] = 'quiz ' . $id . ': ' . $e->getMessage();
						}
					} else {
						try {
							$ent['contenido'] = get_post_field( 'post_content', $id );
						} catch ( \Throwable $e ) {
						}
					}
					$sec['items'][] = $ent;
				}
				$curso['secciones'][] = $sec;
			}
			$out['cursos'][] = $curso;
		}

		$json = wp_json_encode( $out, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PARTIAL_OUTPUT_ON_ERROR );
		if ( false === $json ) {
			$json = json_encode( array( 'error' => 'no-json' ) );
		}
		echo $json;
		exit;
	},
	20
);