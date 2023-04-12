import styles from './SearchBar.module.scss'
import searchIcon from '../../assets/search.svg'
interface IProps {
    value: string;
    onFinish: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({value, onFinish, onChange} : IProps) => {

    return(
        <div className={styles.searchBarContainer}>
            <div className={styles.searchFieldContainer}>
                <img src={searchIcon} alt="searchIcon"/>
                <input className={styles.searchBarField} type="text" value={value} onChange={onChange} placeholder='Search...' />
            </div>
            <div className={styles.searchBarBtnContainer}>
                <button className={styles.searchBarBtn} onClick={onFinish}>Search</button>
            </div>
        </div>
    )
}

export default SearchBar