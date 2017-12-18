
import { UploadFile } from '../models/upload-file';

export interface Store {
    
    //From Users' table
    ownerID: string;
    
    //From Locations' table
    workingRegionID: string;
    
    name: string;
    description: string;
    phone: string;
    tags: string[];
    
    cachedRating: number;
    cachedCount: number;
    
    logo?: UploadFile;
    menu?: UploadFile;
    photos?: UploadFile[];
}
