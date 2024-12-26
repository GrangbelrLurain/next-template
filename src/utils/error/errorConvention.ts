const errorLevel = {
  0: 'debug',
  1: 'log',
  2: 'warn',
  3: 'error',
} as const;

type LogLevel = keyof typeof errorLevel;

type TLog = {
  group: (group: string) => TLog;
  end: () => TLog;
  log: (level: LogLevel, log: string) => TLog;
};

const Logger: TLog = {
  group: (group: string) => {
    console.group(group);
    return Logger;
  },
  end: () => {
    console.groupEnd();
    return Logger;
  },
  log: (level: LogLevel, log: string) => {
    const logger = errorLevel[level];
    const stack = new Error().stack;

    const stackLine = stack?.split('\n')[1]; // 스택의 세 번째 줄에 호출 위치가 있음
    const location = stackLine?.match(/\((.*):(\d+):(\d+)\)/);

    const filePath = location ? `${location[1].split('./')[1]}` : 'unknown';
    const line = location ? location[2] : 'unknown';

    console[logger](`${log} in ${filePath} line ${line}`);
    return Logger;
  },
};

export default Logger;
