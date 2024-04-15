import { makeAutoObservable } from "mobx";
import { BookingService } from "../../services/BookingService";
import { IBooking } from "./types";

export class BookingStore {
    bookingService: BookingService;
    entities: IBooking[] = [];
    filters: any = {};
    isLoading: boolean = false;

    constructor() {
        this.bookingService = new BookingService();
        makeAutoObservable(this);
    }

    async getBookings() {
        this.isLoading = true;
        try {
            this.entities = await this.bookingService.getBookings();
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            this.isLoading = false;
        }
    }

    async getBookingsByTitle(title: string) {
        this.isLoading = true;
        try {
            this.entities = await this.bookingService.getBookingsByTitle(title);
        } catch (error) {
            console.error("Error fetching bookings by title:", error);
        } finally {
            this.isLoading = false;
        }
    }

    async getBookingsByType(type: string) {
        this.isLoading = true;
        try {
            this.entities = await this.bookingService.getBookingsByType(type);
        } catch (error) {
            console.error("Error fetching bookings by type:", error);
        } finally {
            this.isLoading = false;
        }
    }

    async getBookingsByFilter(filter: any) {
        this.isLoading = true;
        try {
            this.entities = await this.bookingService.getBookingsByFilter(filter);
        } catch (error) {
            console.error("Error fetching bookings by filter:", error);
        } finally {
            this.isLoading = false;
        }
    }
    

    updateFilters(newFilterOptions: any) {
        this.filters = { ...this.filters, ...newFilterOptions };
    }

    clearFilters() {
        this.filters = {};
    }
}

export default BookingStore;
