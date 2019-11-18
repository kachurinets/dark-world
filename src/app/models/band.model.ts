export interface Band {
    id: string;
    serialNumber?: number;
    name: string;
    info?: string;
    imagePath?: string;
    genre?: string;
    existence?: string;
    country?: string;
    members?: Array<any>;
    pastMembers?: Array<any>;
    discography?: Array<any>;
    videography?: Array<any>;
    creator?: string;
}
