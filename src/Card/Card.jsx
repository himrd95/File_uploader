import React from "react";
import styles from "./Card.module.css";

const Card = () => {
	return (
		<div className={styles.card}>
			<div className={styles.card__Container}>
				<h3>This is Card</h3>
				<div className={styles.description}>
					<div className={styles.description_container}>
						<h4>This id Des</h4>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
