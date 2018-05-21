import { Status } from "./status.model";

export class Camera {
    id: string;
    name: string;
    namespace: string;
    resolution: string;
    fileOutput: string;
    uri: string;
    location: string;
    status: Status;
    description: string;
    created_at: Date;
    updated_at: Date;

    constructor() {

    }
}