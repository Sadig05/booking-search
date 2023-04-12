export interface IBooking{
    id: number;
    createdDateTime: Date;
    img: string;
    title: string;
    location: string;
    about: string[];
    price: number;
    type: string;
}

export interface IFilter{
    title_like?: string;
    type?: string;
    createdDateTime?: Date;
    price?: number;
}