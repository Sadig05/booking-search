import {useStore} from "../../stores/RootStore";
import {IBooking} from "../../stores/BookingStore/types";
import EntityCard from "../../components/EntityCard/EntityCard";
import styles from './Home.module.scss'
import {useEffect, useState} from "react";
import {observer} from "mobx-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SelectBox from "../../components/SelectBox/SelectBox";

export interface ISelect{
    value: string,
    label: string,
}

const optionsType = [
    {value: 'Villa', label: 'Villa'},
    {value: 'Appartment', label: 'Appartment'},
    {value: 'Townhouse', label: 'Townhouse'}
];

const optionsFilter = [
    {value: 'Date added', label: 'Date added'},
    {value: 'Highest price', label: 'Highest price'},
    {value: 'Lowest price', label: 'Lowest price'}
];

const Home = () => {
    const {bookingStore} = useStore();
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectType, setSelectType] = useState<string>('');
    const [selectFilter, setSelectFilter] = useState<string>('');

    const handleGetBookingsByType = (selectedValue: ISelect) => {
        const valueM = selectedValue.value;
        setSelectType(valueM);
        bookingStore.getBookingsByType(valueM);
    };

    const handleOnFinish = () => {
        bookingStore.getBookingsByTitle(searchValue)
    }

    const handleSelectBookingFilter = (selectedValue: ISelect) => {
        const valueM = selectedValue.value;
        setSelectFilter(valueM);
  
    
        // Define sortOptions based on the selected filter value
        let sortOptions = {};
        if (valueM === 'Date added') {
            sortOptions = { _sort: 'createdDateTime', _order: 'desc' };
        } else if (valueM === 'Highest price') {
            sortOptions = { _sort: 'price', _order: 'desc' };
        } else if (valueM === 'Lowest price') {
            sortOptions = { _sort: 'price', _order: 'asc' };
        }


        bookingStore.getBookingsByFilter(sortOptions);
    }
    

    const clearFilters = () => {
        bookingStore.clearFilters();
        setSelectFilter('');
        setSelectType('');
        bookingStore.getBookings();
        setSearchValue('')
    }


    return (
        <section>
            <main className={styles.container}>
                <div className={styles.selectWrapper}>
                    <div className={styles.selectContainer}>
                        <SelectBox
                            placeHolder="Sort by"
                            defaultValue={optionsFilter[0]}
                            options={optionsFilter}
                            onChange={handleSelectBookingFilter}
                            selectedValue={selectFilter}
                        />
                        <div style={{ zIndex: 0 }}>
                            <SelectBox
                                placeHolder="Type"
                                defaultValue={optionsType[0]}
                                options={optionsType}
                                onChange={handleGetBookingsByType}
                                selectedValue={selectType}
                            />
                        </div>
                        <button onClick={clearFilters} className={styles.clearFilter}>
                            Clear Filter
                        </button>
                    </div>
                </div>
                <div className={styles.mainPartContainer}>
                    <div className={styles.searchBarContainer}>
                        <SearchBar
                            isLoading={bookingStore.isLoading}
                            value={searchValue}
                            onFinish={handleOnFinish}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setSearchValue(e.target.value)
                            }
                        />
                    </div>
                    {bookingStore.isLoading ? (
                        <>
                            {[...Array(bookingStore.entities.length)].map((_, index) => (
                                <div key={index} className={styles.skeleton}>
                                    <div className={styles.imgSkeleton}>
                                        <div className={styles.skeletonImage}></div>
                                    </div>
                                    <div className={styles.contentSkeleton}>
                                        <div className={styles.skeletonTitle}></div>
                                        <div className={styles.skeletonLocation}></div>
                                        <div className={styles.skeletonAbout}></div>
                                        {/*<div className={styles.skeletonPrice}></div>*/}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {bookingStore.entities.map((item: IBooking, index: number) => (
                                <div key={item.id}>
                                    <div className={styles.entityContainer}>
                                        {bookingStore.isLoading ? (
                                            <div className={styles.skeleton}>
                                                <div className={styles.imgSkeleton}>
                                                    <div className={styles.skeletonImage}></div>
                                                </div>
                                                <div className={styles.contentSkeleton}>
                                                    <div className={styles.skeletonTitle}></div>
                                                    <div className={styles.skeletonLocation}></div>
                                                    <div className={styles.skeletonAbout}></div>
                                                    {/*<div className={styles.skeletonPrice}></div>*/}
                                                </div>
                                            </div>
                                        ) : (
                                            <EntityCard
                                                img={item.img}
                                                title={item.title}
                                                location={item.location}
                                                about={item.about}
                                                price={item.price}
                                            />
                                        )}
                                    </div>
                                    {index !== bookingStore.entities.length - 1 && (
                                        <div className={styles.line}></div>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            </main>
        </section>


    )
}

export default observer(Home)
