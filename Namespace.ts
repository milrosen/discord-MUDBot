export interface Command {
	name: string;
	description: string;
	execute: Function;
	cooldownMessage?: (timeleft: number) => string;
	info?: (any) => Promise<void>;
	cooldown?: number;
}