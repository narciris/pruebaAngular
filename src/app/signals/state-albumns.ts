import { Albumn } from "../models/albumn";

export interface StateAlbumns
 {
    loading: boolean,
    albumns: Albumn[],
    successMessage: string | null,
    errorMessage: string | null
    selectedUserId: number | null
}
