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
        this.entities = await this.bookingService.getBookings();
        this.isLoading = false;
    }

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
}

export default BookingStore
