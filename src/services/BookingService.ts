import axios from "../utils/axios";

export class BookingService {
  getBookings = async () => {
    const res = await axios.get('/places');
    return res.data;
  }

  getBookingsByTitle = async (title: string) => {
    console.log(title, 'booo');
    const params = {
      title: title
    };
    const res = await axios.get('/places', { params });
    return res.data;
  }

  getBookingsByType = async (type: string) => {
    const params = {
      type: type
    };
    const res = await axios.get('/places', { params });
    return res.data;
  }

  async getBookingsByFilter(filter: any) {
    const res = await axios.get('/places', { params: filter }); // Pass 'filter' directly as params
    return res.data;
}


}
