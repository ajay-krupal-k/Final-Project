export interface Invite {
    _id: string;
    name: string;
    email: string;
    status: string;
    channels: {
        name: string;
        description: string;
    }[];
    permissions: string[];
}
