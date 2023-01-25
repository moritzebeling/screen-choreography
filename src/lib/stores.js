import { writable } from 'svelte/store';

import { User } from './models/User.js';
import { Room } from './models/Room.js';
import { Scene } from './models/Scene.js';
import { ControlSettings } from './models/ControlSettings.js';

export const userStore = writable( new User() );
export const roomStore = writable( new Room() );
export const sceneStore = writable( new Scene() );
export const settingsStore = writable( new ControlSettings() );