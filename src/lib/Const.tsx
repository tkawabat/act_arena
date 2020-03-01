export const ConfigId = 'config';
export const AppStoreUrl = {
    'ios': 'https://t.co/q28fs9e7cq?amp=1',
    'android': 'https://t.co/1GNQkeYCfG?amp=1',
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
    [ArenaState.READ]: '台本チェック',
    [ArenaState.CHECK]: 'マイクチェック',
    [ArenaState.ACT]: '上演',
}

export const ArenaStateStyle = {
    [ArenaState.WAIT]: {'success':true},
    [ArenaState.READ]: {'warning':true},
    [ArenaState.CHECK]: {'warning':true},
    [ArenaState.ACT]: {'danger':true},
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

export const ArenaUserStateStyle = {
    [ArenaUserState.LISTNER]: {'warning':true},
    [ArenaUserState.ENTRY]: {'warning':true},
    [ArenaUserState.ACTOR]: {'danger':true},
}

export enum AgreementState {
    NONE,
    READ,
    AGREE,
}

export enum ArenaTab {
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

export const PushIntervalHour = 3;

export const MusicList = [
    //{ file: 'amanojack.mp3', name: '天邪鬼の子', site: '騒音のない世界'},
    { file: 'neverend.mp3', name: '終わりのない物語', site: '騒音のない世界'},
    { file: 'yoake.mp3', name: 'この夜が明けるまで', site: '騒音のない世界'},
    { file: 'sayonara3.mp3', name: 'さよなら', site: '騒音のない世界'},
]

export enum SeKey {
    ACT_START = 1,
    ACT_END = 2,
    MATCHING = 3,
    ENTER_ROOM = 4,
}

export const SePath = '../../resource/se';
export const SeList = {
    [SeKey.ACT_START]:  { file: 'buzzer_opening1.mp3', site: '効果音ラボ'},
    [SeKey.ACT_END]:    { file: 'people_people_stadium_cheer1.mp3', site: '効果音ラボ'},
    [SeKey.MATCHING]:   { file: 'tin2.mp3', site: '効果音ラボ'},
    [SeKey.ENTER_ROOM]: { file: 'cursor1.mp3', site: '効果音ラボ'},
}

export const SoundFadeDuration = 8000;
export const OverlayDuration = 1000;

export const SchedulerArenaTick = 'ArenaTick';
export const SchedulerAndroidReload = 'AndroidReload';