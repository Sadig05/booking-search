import {useStore} from "../../stores/RootStore";
import {IBooking} from "../../stores/BookingStore/types";
import EntityCard from "../../components/EntityCard/EntityCard";
import styles from './Home.module.css'
import {useEffect, useState} from "react";
import Spinner from "../../components/Spinner/Spinner";
import {observer} from "mobx-react";
import SearchBar from "../../components/SearchBar/SearchBar";
import SelectBox from "../../components/SelectBox/SelectBox";

export interface ISelect {
    value: string;
    label: string;
}

const optionsType = [
    { value: 'Villa', label: 'Villa' },
    { value: 'Apartment', label: 'Apartment' },
    { value: 'Townhouse', label: 'Townhouse' }
];

const optionsFilter = [
    { value: 'addedDate', label: 'Date added' },
    { value: 'priceDesc', label: 'Highest price' },
    { value: 'priceAsc', label: 'Lowest price' }
];

const Home = () => {
    const {bookingStore} = useStore();
    const [searchValue , setSearchValue] = useState<string>('');
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
        bookingStore.getBookingsFilter(valueM);
    }


    return (
        <section>
            {
                bookingStore.isLoading ? (<Spinner/>) :
                    (
                        <main className={styles.container}>
                            <div className={styles.selectContainer}>
                                <SelectBox options={optionsType} onChange={handleGetBookingsByType} selectedValue={selectType}/>
                                <SelectBox options={optionsFilter} onChange={handleSelectBookingFilter} selectedValue={selectFilter}/>
                            </div>
                           <div className={styles.mainPartContainer}>
                               <SearchBar value={searchValue} onFinish={handleOnFinish}
                                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}/>

                               {
                                   bookingStore.entities.map((item: IBooking, index: number) => {
                                       return (

                                           <div>
                                               <EntityCard img={item.img} title={item.title} location={item.location}
                                                           about={item.about}
                                                           price={item.price} key={item.id}/>
                                               {index !== bookingStore.entities.length - 1 && (
                                                   <div className={styles.line}></div>
                                               )}
                                           </div>


                                       )
                                   })
                               }
                           </div>
                        </main>
                    )
            }

        </section>
    )
}

export default observer(Home)