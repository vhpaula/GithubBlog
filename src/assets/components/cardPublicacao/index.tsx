import styles from "./cardPublicacao.module.css";
import { Link } from "react-router-dom";

interface PublicacaoProps {
    title: string;
    timestemp: string;
    description: string;
}

export function CardPublicacao({
    title,
    timestemp,
    description,
}: PublicacaoProps) {
    return (
        <Link to={`/repository/${title}`} className={styles.cardPublicacao}>
            <div className={styles.titleCard}>
                <p>{title}</p>
                <span>{timestemp}</span>
            </div>
            <p className={styles.descriptionCard}>{description}</p>
        </Link>
    );
}
