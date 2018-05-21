import { CreatedType } from "./created-type.enum";
import { HostBy } from "./host-by.enum";

export class Video {

    private id: string;

    private id_video: string;

    private url : string;

    private hosted_by: HostBy;

    private title: string;

    private description : string;

    private startd_at: Date;

    private ended_at: Date;

    private embedded_link: string;

    private created_type: CreatedType

}