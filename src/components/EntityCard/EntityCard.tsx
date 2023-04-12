import styles from './EntityCard.module.css'
import pin from '../../assets/pin.svg'
interface IProps {
    img: string;
    title: string;
    location: string;
    about: string[];
    price: number;
}

const EntityCard = ({img, title, location, about, price}: IProps) => {
    const separator = <span className={styles.dot}> &bull; </span>;
    return (
        <div className={styles.cardContainer}>
            {/*<div className={styles.imgContainer}>*/}
                <img className={styles.img} src={img} alt=""/>
            {/*</div>*/}
            <div className={styles.entityContent}>
                <p className={styles.title}>{title}</p>
                <div className={styles.locationContainer}>
                    <img src={pin} alt=""/>
                    <div className={styles.location}>{location}</div>
                </div>
                <div className={styles.about} >   {about.map((item, index) => (
                    <div key={index}>
                        <span>{item}</span>
                        {index !== about.length - 1 && separator} {/* add the separator after each element, except for the last one */}
                    </div>
                ))}</div>
                    <p className={styles.price}>{`€ ${price}`}</p>
            </div>
        </div>
    )
}

export default EntityCard