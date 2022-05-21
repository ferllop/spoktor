export class Intersect {
    execute(spotify, traktor) {
        return traktor.filter(track => spotify.includes(track))
    }
}