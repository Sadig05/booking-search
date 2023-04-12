
import { makeAutoObservable, configure } from "mobx";
import { createContext , ReactNode, useContext} from "react";
import BookingStore from './BookingStore/BookingStore'

configure({
    enforceActions: "never"
})

export class RootStore {
    bookingStore: BookingStore;

    constructor() {
        makeAutoObservable(this);
        this.bookingStore = new BookingStore();
        this.bookingStore.getBooking();
    }
}

interface IStoreComponent {
    store: RootStore;
    children: ReactNode;
}



export const StoreContext = createContext<RootStore> ({} as RootStore);

export const StoreProvider = ({ children, store }: IStoreComponent) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
};

export const useStore = () => useContext<RootStore>(StoreContext);

export default RootStore;