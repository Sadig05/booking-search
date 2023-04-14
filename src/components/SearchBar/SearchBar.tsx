import styles from './SearchBar.module.scss'
import searchIcon from '../../assets/search.svg'
import Spinner from "../Spinner/Spinner";
interface IProps {
    value: string;
    onFinish: () => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
}

const SearchBar = ({value, onFinish, onChange, isLoading} : IProps) => {

    return(
        <div className={styles.searchBarContainer}>
            <div className={styles.searchFieldContainer}>
                <img src={searchIcon} alt="searchIcon"/>
                <input className={styles.searchBarField} type="text" value={value} onChange={onChange} placeholder='Search...' />
            </div>
            <div className={styles.searchBarBtnContainer}>
                <button className={styles.searchBarBtn} style={isLoading ? {backgroundColor: '#E0E0E0' , cursor: 'not-allowed'} : {}} onClick={onFinish}>{isLoading ? <Spinner color='white' height={24} width={24} />: 'Search'}</button>
            </div>
        </div>
    )
}

export default SearchBar