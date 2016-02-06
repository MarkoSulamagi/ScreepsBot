import {Config} from "./config/config";
import {MemoryManager} from "./shared/memory-manager";
import {RoomManager} from "./components/rooms/room-manager";
import {SpawnManager} from "./components/spawns/spawn-manager";
import {SourceManager} from "./components/sources/source-manager";
import {CreepManager} from "./components/creeps/creep-manager";

/**
 * Application start
 */
export namespace GameManager {

    export function globalBootstrap() {
        RoomManager.loadRooms();
        SpawnManager.loadSpawns();
        SourceManager.loadSources();
    }

    export function loop() {
        MemoryManager.loadMemory();
        CreepManager.loadCreeps();

        if (!CreepManager.isHarvesterLimitFull()) {
            CreepManager.createHarvester();

            if (Config.VERBOSE) {
                console.log("Need more harvesters!");
            }
        }

        CreepManager.harvestersGoToWork();
    }

}