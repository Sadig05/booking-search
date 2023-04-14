import { makeAutoObservable } from "mobx";
import { BookingService } from "../../services/BookingService";
import { IBooking } from "./types";



export class BookingStore {
    bookingService: BookingService;
    entities: IBooking[] = [];
    filters = {};
    isLoading: boolean = false;

    constructor() {
        console.log("BookingStore constructor");
        this.bookingService = new BookingService();
        makeAutoObservable(this);
    }


    getBookings = async () => {
        this.isLoading = true;

        // Show the skeleton for at least 1 second
        const MIN_LOADING_TIME = 1000;
        const startLoadingTime = Date.now();

        this.entities = await this.bookingService.getBookings();

        const endLoadingTime = Date.now();
        const loadingTime = endLoadingTime - startLoadingTime;

        if (loadingTime < MIN_LOADING_TIME) {
            setTimeout(() => {
                this.isLoading = false;
            }, MIN_LOADING_TIME - loadingTime);
        } else {
            this.isLoading = false;
        }
    };


    getBookingsByTitle = async (title: string) => {
        this.isLoading = true;
        this.filters = { ...this.filters, title_like: title };
        this.entities = await this.bookingService.getBookingsByTitle( this.filters);
        this.isLoading = false;
    }

    getBookingsByType = async (type: string) => {
        this.isLoading = true;
        this.filters = { ...this.filters, type: type };
        this.entities = await this.bookingService.getBookingsByType( this.filters);
        this.isLoading = false;
    }

    getBookingsByFilter = async (filter: string) => {
        this.isLoading = true;
        const sortOptions = {
            _sort: '',
            _order: ''
        };

        if (filter === 'Date added') {
            sortOptions._sort = 'createdDateTime';
            sortOptions._order = 'desc';
        } else if (filter === 'Highest price') {
            sortOptions._sort = 'price';
            sortOptions._order = 'desc';
        } else if (filter === 'Lowest price') {
            sortOptions._sort = 'price';
            sortOptions._order = 'asc';
        }
        this.filters = { ...this.filters, ...sortOptions };
        this.entities = await this.bookingService.getBookingsByFilter(this.filters);
        this.isLoading = false;
    }

    updateFilters = (newFilterOptions: any) => {
        this.filters = { ...this.filters, ...newFilterOptions };
    };

    clearFilters = () => {
        this.filters = '';

    }
}

export default BookingStore
