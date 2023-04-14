import axios from "../utils/axios";
import { IBooking } from "../stores/BookingStore/types";



export class BookingService {

    getBookings =  async () => {
        const res = await axios.get('/places')
        return res.data
    }

    getBookingsByTitle =  async (title) => {
        const params = {
            title_like: title
        }
        console.log(params)
        const res = await axios.get('/places', {params: title})
        return res.data
    }

    getBookingsByType =  async (type) => {
        const params = {
            type: type
        }
        console.log(params)
        const res = await axios.get('/places', {params: type})
        return res.data
    }

    getBookingsByFilter =  async (filter) => {

        const res = await axios.get('/places', {params: filter })
        return res.data
    }
}
