export enum UserIconSize {
    S = 24
    , M = 32
    , L = 64
}

export enum Gender {
    Unknown = 0
    , Male = 1
    , Female = 2
}

export enum ArenaState {
    WAIT = 0
    , READY = 1
    , CONFIRM = 2
    , CHECK = 3
    , ACT = 4
}

export const ArenaStateString = {
    [ArenaState.WAIT]: '演者募集'
    , [ArenaState.READY]: 'マイクチェック'
    , [ArenaState.CONFIRM]: '準備'
    , [ArenaState.CHECK]: '台本読込'
    , [ArenaState.ACT]: '上演'
}

export enum ArenaUserState {
    LISTNER = 0
    , ENTRY = 1
    , ACTOR = 2
}

export enum AgreementState {
    NONE
    , READ
    , AGREE
}

export enum SkywayState {
    INIT
    , OPEN
    , JOIN
}

export enum SpeakState {
    SPEAK,
    MUTE,
    DISABLED
}

export enum OverlayMessageState {
    INIT
    , FIRST
    , SECOND
}