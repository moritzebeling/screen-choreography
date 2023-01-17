import { writable } from 'svelte/store';

import { ControlSettings } from "$lib/models/ControlSettings";
export let settingsStore = writable( new ControlSettings() );

import { Scene } from "$lib/models/Scene";
export let sceneStore = writable( new Scene() );
