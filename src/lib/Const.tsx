export const ConfigId = 'config';
export const AppStoreUrl = {
    'ios': 'https://t.co/q28fs9e7cq?amp=1',
    'android': 'market://details?id=act.arena',
}

export enum UserIconSize {
    S = 24,
    M = 32,
    L = 64,
}

export enum Gender {
    Unknown = 0,
    Male = 1,
    Female = 2,
}

export const UserNameMin = 1;
export const UserNameMax = 20;

export const UserNgLimit = 50;

export const RoomUserLimit = 10;

export enum ArenaState {
    WAIT = -1,
    READ = 0,
    CHECK = 1,
    ACT = 2,
}

export const ArenaStateString = {
    [ArenaState.WAIT]: '演者募集',
    [ArenaState.READ]: '台本確認',
    [ArenaState.CHECK]: '音声確認',
    [ArenaState.ACT]: '上演中',
}

export const ArenaStateTime = {
    [ArenaState.WAIT]: 0,
    [ArenaState.READ]: 60,
    [ArenaState.CHECK]: 30,
    [ArenaState.ACT]: 180,
}

export enum ArenaUserState {
    LISTNER = 0,
    ENTRY = 1,
    ACTOR = 2,
}

export const ArenaUserStateString = {
    [ArenaUserState.LISTNER]: 'リスナー',
    [ArenaUserState.ENTRY]: 'リスナー',
    [ArenaUserState.ACTOR]: 'アクター',
}

export enum AgreementState {
    NONE,
    AGREE,
}

export enum ArenaTab {
    SCENARIO,
    CHAT,
}

export enum TheaterState {
    UNSET = -1,
    READ = 0,
    CHECK = 1,
    ACT = 2,
    END = 3,
}

export const TheaterStateString = {
    [TheaterState.READ]: '台本確認',
    [TheaterState.CHECK]: '音声確認',
    [TheaterState.ACT]: '上演中',
    [TheaterState.END]: '上演終了',
}

export const TheaterNextString = {
    [TheaterState.READ]: '確認\n完了',
    [TheaterState.CHECK]: '確認\n完了',
    [TheaterState.ACT]: '上演\n終了',
    [TheaterState.END]: '上演\n終了',
}

export enum TheaterUserState {
    LISTNER = 0,
    ACTOR = 1,
}

export const TheaterUserStateString = {
    [TheaterUserState.LISTNER]: 'リスナー',
    [TheaterUserState.ACTOR]: 'アクター',
}

export enum TheaterTab {
    SCENARIO,
    CHAT,
}

export enum SkywayState {
    INIT,
    OPEN,
    JOIN,
}

export enum SpeakState {
    SPEAK,
    MUTE,
    DISABLED,
}

export enum OverlayMessageState {
    INIT,
    FIRST,
    SECOND,
}

export enum MusicState {
    STOP,
    PLAY,
}

export enum PushBasicSettingKey {
    MORNING  = 1,
    DAYTIME  = 2,
    TWILIGHT = 3,
    EVENING  = 4,
    NIGHT    = 5,
    MIDNIGHT = 6,
    DAWN     = 7,
}

export const PushBasicSettingString  = {
    [PushBasicSettingKey.MORNING]:  '午前（０９：００〜１２：００）',
    [PushBasicSettingKey.DAYTIME]:  '昼間（１２：００〜１５：００）',
    [PushBasicSettingKey.TWILIGHT]: '夕方（１５：００〜１８：００）',
    [PushBasicSettingKey.EVENING]:  '宵入（１８：００〜２１：００）',
    [PushBasicSettingKey.NIGHT]:    '　夜（２１：００〜２４：００）',
    [PushBasicSettingKey.MIDNIGHT]: '深夜（００：００〜０２：００）',
    [PushBasicSettingKey.DAWN]:     '未明（０２：００〜０９：００）',
}

export enum MatchingPlayTime {
    HALF = 1,
    ONE = 2,
    ONEHALF = 3,
    TWO = 4,
}

export enum MatchingPlace {
    ACTARENA = 1,
    DISCORD = 2,
}

export const MatchingTime = 30 * 60; // 30minutes
export const PushIntervalHour = 1;

export const MusicList = [
    //{ file: 'amanojack.mp3', name: '天邪鬼の子', site: '騒音のない世界'},
    { file: 'neverend.mp3', name: '終わりのない物語', site: '騒音のない世界'},
    { file: 'yoake.mp3', name: 'この夜が明けるまで', site: '騒音のない世界'},
    { file: 'sayonara3.mp3', name: 'さよなら', site: '騒音のない世界'},
]

export enum SeKey {
    ACT_START,
    ACT_END,
    MATCHING,
    ENTER_ROOM,
    CANCEL,
}

export const SePath = '../../resource/se';
export const SeList = {
    [SeKey.ACT_START]:  { file: 'buzzer_opening1.mp3', site: '効果音ラボ'},
    [SeKey.ACT_END]:    { file: 'people_people_stadium_cheer1.mp3', site: '効果音ラボ'},
    [SeKey.MATCHING]:   { file: 'tin2.mp3', site: '効果音ラボ'},
    [SeKey.ENTER_ROOM]: { file: 'cursor1.mp3', site: '効果音ラボ'},
    [SeKey.CANCEL]: { file: 'cancel8.mp3', site: 'ポケットサウンド'},
}

export const SoundFadeDuration = 8000;
export const OverlayDuration = 1000;

export const SchedulerArenaTick = 'ArenaTick';
export const SchedulerTheaterTick = 'TheaterTick';
export const SchedulerMatchingTimeLimitCheck = 'MatchingTimeLimitCheck';
export const SchedulerAndroidReload = 'AndroidReload';