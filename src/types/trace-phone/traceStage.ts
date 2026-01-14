export const TraceStage = {
    IDLE: 'IDLE',
    INIT: 'INITIALIZING',
    PINGING: 'PINGING',
    TRIANGULATING: 'TRIANGULATING',
    RESOLVING: 'RESOLVING',
    SUCCESS: 'SUCCESS',
}
export type TraceStage = typeof TraceStage[keyof typeof TraceStage];