

Procedural Dungeon Generator (Roblox /
## Lua)
## Overview
This project is a procedural dungeon generation system built in Roblox using Lua. The goal
was to generate playable, non-repetitive dungeon layouts at runtime instead of having a
set floor for each level. It was a good way to learn how procedural content generation
actually works in a real environment.
## Why Procedural Generation
Set dungeon layouts don’t scale when the idea of the game was to have replayability with a
different run for each playthrough. Procedural generation solves this by defining a set of
rules and building blocks (rooms, corridors, connection points) and letting an algorithm
assemble them differently each time. The downside is complexity, making sure that there
are no issues with connections, overlaps, and that the player can actually reach the end.
## Approach
The generation approach used a room-and-corridor model:
- A pool of pre-built room "pieces" with only a defined starting point
- From the starting room the algorithm iteratively attaches new rooms to open
connection points, checking for collisions with already placed geometry before
confirming placement
- Limit system (max rooms, max attempts per connection point) to prevent infinite
loops when the algorithm couldn't find a valid placement.
## Key Technical Challenges
- Collision detection between rooms: before placing a new room piece, the system
needed to check it against every already placed piece to avoid overlapping
geometry. This is the kind of problem where a naive check everything against

everything approach works fine at small scale but would need spatial partitioning if
the dungeon size grew significantly.
- Guaranteeing connectivity: making sure every generated room is actually
reachable from the start, meaning there are no outliers. This required generation to
be connection point driven rather than placing rooms randomly in space and hoping
they lined up.
- Balancing randomness with playability: fully random generation produces boring
or broken layouts just as often as interesting ones. Constraining the algorithm
(room variety and min/max room counts) were necessary to keep output
consistently playable.
## What I'd Do Differently
- Add a seed system so specific dungeon layouts could be reproduced for debugging
or shared between players
- Expand the room piece pool variety in rooms matters more than algorithm
sophistication for how "non-repetitive" a dungeon feels to a player
- Profile performance for larger dungeon sizes; the current collision checking
approach would need optimization (spatial partitioning) to scale higher.
