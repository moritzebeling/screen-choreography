import Pendelum from "./Pendelum.svelte";
import Flicker from "./Flicker.svelte";
import Linear from "./Linear.svelte";
import GradientConic from "./GradientConic.svelte";
import DebugDots from "./DebugDots.svelte";
import Raster from "./Raster.svelte";
import Unfold from "./Unfold.svelte";
import Tunnel from "./Tunnel.svelte";
import Vertigo from "./Vertigo.svelte";
import Colors from "./Colors.svelte";

export let animations = {
    "Flicker": Flicker,
    "Colors": Colors,
    "Linear": Linear,
    "Unfold": Unfold,
    "Raster": Raster,
    "Tunnel": Tunnel,
    "Pendelum": Pendelum,
    "Conic": GradientConic,
    "Vertigo": Vertigo,
    "Debug Dots": DebugDots,
};