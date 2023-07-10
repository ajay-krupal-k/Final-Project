export interface Invite {
    name: string;
    email: string;
    status: string;
    channels: {
        name: string;
        description: string;
    }[];
    permissions: string[];
}
