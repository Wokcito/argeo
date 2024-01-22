export interface ArgeoResponse<Data = unknown> {
    data: Data | null
    error: unknown | null
}
