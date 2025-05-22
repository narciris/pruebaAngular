import { LogResponse } from "../models/api-logs";

export interface StateLogs {
    logs: LogResponse[],
    loading:boolean,
    succesMesagge: string | null
    errorMessage: string | null,
    selected?: LogResponse | null
}
