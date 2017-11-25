export interface Location {
    
    // Optional
    number?: number;
    address?: string;
    abreviation?: string;
    type?: string;
    
    // Required
    district: string;
    city: string;
    state: string;
    county: string;
    
    lat: string;
    long: string;
}
