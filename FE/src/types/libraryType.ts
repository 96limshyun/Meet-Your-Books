interface Library {
    libCode: string;
    libName: string;
    address: string;
    tel: string;
    fax: string;
    latitude: string;
    longitude: string;
    homepage: string;
    closed: string;
    operatingTime: string; 
}

export interface LibrariesType {
    lib: Library
}