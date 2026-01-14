import type { Gender } from "./gender";

export interface Person
{
    id: number;
    name: string;
    gender: Gender;
    dateofbirth: string;
    phoneNumber: string;
    mugshot: string;
}