export interface UserData {
    num_records: number;
    user_data: {
        [key: string]: {
            [property: string]: string | number | boolean | undefined;
            data_type: string;
            // min_num?: number;
            // max_num?: number;
            // phone_number_format?: number;
        };
    };
    data_format: string;

}
