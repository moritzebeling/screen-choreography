<script>

    import { PUBLIC_SOCKET } from '$env/static/public';
    import { dev } from '$app/environment';

    import { duration, seconds, time } from "$lib/clock";
    import { currentScene } from "$lib/control";
    import { user, users } from "$lib/realtime";

    $: data = {
        date: {
            time: $time,
            seconds: $seconds,
            timeOnSite: $duration,
        },
        user: {
            id: $user.id,
            orderInRoom: $user.num,
            isTouch: 'unknown', // todo
        },
        room: {
            connected: 'unknown', // todo
            id: $currentScene,
            totalUsers: $users.total,
        },
        system: {
            host: PUBLIC_SOCKET,
            environment: dev ? 'development' : 'production',
        },
        app: {
            website: 'https://screens.moritzebeling.com',
            repo: 'https://github.com/moritzebeling/screen-choreography.git',
            issues: 'https://github.com/moritzebeling/screen-choreography/issues'
        }
    };

</script>

<main>
    <pre>{JSON.stringify(data, null, 4)}</pre>
</main>

<style>

    pre {
        margin: 1rem;
    }

</style>