export interface Review {
    
    key?: string;
    ownerID: string;
    ownerName: string;
    
    storeID: string;
    
    rating: number;
    comment: string;
}