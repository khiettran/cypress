// The type declarations for Cypress Logs & the corresponding configuration permutations
declare namespace Cypress {
  interface Cypress {
    log(options: Partial<LogConfig | InternalLogConfig>): Log | undefined
  }

  interface Log extends Log {
    set<K extends keyof LogConfig | InternalLogConfig>(key: K, value: LogConfig[K]): InternalLog
    set(options: Partial<LogConfig | InternalLogConfig>)
    groupEnd(): void
  }

  interface InternalLogConfig {
    // defaults to command
    instrument?: 'agent' | 'command' | 'route'
    // name of the log
    name?: string
    // the name override for display purposes only
    displayName?: string
    id?: string
    // additional information to include in the log if not overridden
    // the render props message
    // defaults to command arguments for command instrument
    message?: string | Array<string> | any[]
    // whether or not the xhr route had a corresponding response stubbed out
    isStubbed?: boolean
    alias?: string
    aliasType?: 'agent' | 'route' | 'primitive' | 'dom' | undefined
    referencesAlias?: ReferenceAlias[]
    isStubbed?: boolean
    chainerId?: string
    commandName?: string
    method?: string
    // the JQuery element for the command. This will highlight the command
    // in the main window when debugging
    $el?: jQuery<any> | string
    callCount?: number
    count?: number
    coords?: {
      left: number
      leftCenter: number
      top: number
      topCenter: number
      x: number
      y: number
    }
    end?: boolean
    ended?: boolean
    expected?: string
    // whether or not to show the log in the Reporter UI or only
    // store the log details on the command and log manager
    emitOnly?: boolean
    functionName?: string
    // whether or not to start a new log group
    groupStart?: boolean
    hookId?: number
    // representative of Mocha.Runnable.constants (not publicly exposed by Mocha types)
    state?: "failed" | "passed" | "pending" 
    //     // the type of log
    //     //   system - log generated by Cypress
    //     //   parent - log generated by Command
    //     //   child  - log generated by Chained Command
    type?: 'system' | 'parent' | 'child' | ((current: State['state']['current'], subject: State['state']['subject']) => 'parent' | 'child')
    // whether or not the generated log was an event or command
    event?: boolean
    err?: Error
    error?: Error
    url?: string
    status?: number
    // the number of xhr responses that occurred. This is only applicable to
    // logs defined with instrument=route
    numResponses?: number
    numElements?: number
    response?: string | object
    // provide the content to display in the dev tool's console when a log is 
    // clicked from the Reporter's Command Log
    consoleProps?: () => ConsoleProps
    renderProps?: () => RenderProps
    response?: string | object
    snapshot?: boolean
    snapshots?: []
    selector?: any
    testCurrentRetry?: number
    timeout?: number
    testId?: string
    viewportHeight?: number
    viewportWidth?: number
    visible?: boolean
    wallClockStartedAt?: string
    browserPreRequest?: any
    // timeout of the group command - defaults to defaultCommandTimeout
    timeout?: number
  }

  type ReferenceAlias = {
    cardinal: number,
    name: string,
    ordinal: string,
  }

  type Snapshot = {
    body?: {get: () => any},
    htmlAttrs?: {[key: string]: any},
    name?: string
  }

  type ConsoleProps = {
    Command?: string
    Snapshot?: string
    Elements?: number
    Selector?: string
    Yielded?: HTMLElement
    Event?: string
    Message?: string
    actual?: any
    expected?: any
  }

  type RenderProps = {
    indicator?: 'aborted' | 'pending' | 'successful' | 'bad'
    message?: string
  }
}
