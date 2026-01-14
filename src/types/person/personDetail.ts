import type { ArrestRecord } from "../arrest-record/arrestRecord";
import type { ArrestWarrant } from "../arrest-warrant/arrestWarrant";
import type { CrimeRecord } from "../crime-record/crimeRecord";
import type { License } from "../license/license";
import type { Ticket } from "../ticket/ticket";
import type { Vehicle } from "../vehicle/vehicle";
import type { Person } from "./person";

export interface PersonDetail 
{
    character: Person;
    licenses: License[];
    vehicles: Vehicle[];
    warrants: ArrestWarrant[],
    arrests: ArrestRecord[];
    crimeRecords: CrimeRecord[];
    tickets: Ticket[];
}