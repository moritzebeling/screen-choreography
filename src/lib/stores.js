import { writable } from 'svelte/store';

import { User } from './models/User';
import { Room } from './models/Room';
import { Scene } from './models/Scene';
import { ControlSettings } from './models/ControlSettings';

export const userStore = writable( new User() );
export const roomStore = writable( new Room() );
export const sceneStore = writable( new Scene() );
export const settingsStore = writable( new ControlSettings() );