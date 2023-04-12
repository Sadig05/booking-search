import axios from '../utils/axios'
import {IBooking, IFilter} from "../stores/BookingStore/types";

class bookingService{
    // getData = async (params: IFilter) => {
    //     const request = await axios.get('/places', {
    //         params: {
    //             ...params,
    //             "_sort": "id",
    //             "_order": "desc",
    //             "title_like": params.title
    //         },
    //     });
    //     return request.data;
    // };

    getBooking = async () => {
        const res = await axios.get('/places')
        return res.data
    }

    async getBookingsByTitle(title: string) {
        const params = {
            title_like: title,
        };
        const res = await axios.get('/places', {
            params: {
                ...params
            }
        })
        return res.data
    }

    async getBookingsByType(type: string) {
        const params = {
            type: type,
        };
        const res = await axios.get('/places', {
            params: {
                ...params
            }
        })
        return res.data
    }

    async getBookingsFilter(filterBy: string) {
        let params: any = {};

        if (filterBy === 'addedDate') {
            // Sort by added date in descending order
            params = { ...params, _sort: 'createdDateTime', _order: 'desc' };
        } else if (filterBy === 'priceDesc') {
            // Sort by price in descending order
            params = { ...params, _sort: 'price', _order: 'desc' };
        } else if (filterBy === 'priceAsc') {
            // Sort by price in ascending order
            params = { ...params, _sort: 'price', _order: 'asc' };
        }

        const res = await axios.get('/places', { params: params });
        return res.data;
    }

}

export default bookingService