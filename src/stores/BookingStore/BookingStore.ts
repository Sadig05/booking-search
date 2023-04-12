import {makeAutoObservable, reaction} from "mobx";
import {IBooking} from "./types";
import bookingService from "../../services/BookingService";
import {IFilter} from "./types";

class BookingStore{
    bookingService: bookingService;
    entities: IBooking[] = [];
    filters: IFilter = {};
    isLoading: boolean = false;


    constructor() {
        console.log("BookingStore constructor");
        this.bookingService = new bookingService();
        makeAutoObservable(this);

    }

    getBooking = async () => {
        this.isLoading = true;
        this.entities = await this.bookingService.getBooking();
        this.isLoading = false;
    }

    async getBookingsByTitle(title: string) {
        this.isLoading = true;
        this.entities = await this.bookingService.getBookingsByTitle(title);
        this.isLoading = false;
    }

    async getBookingsByType(type: string) {
        this.isLoading = true;
        this.entities = await this.bookingService.getBookingsByType(type);
        this.isLoading = false;
    }

    async getBookingsFilter(filterBy: string) {
        this.isLoading = true;
        this.entities = await this.bookingService.getBookingsFilter(filterBy)
        this.isLoading = false;
    }

}

export default BookingStore