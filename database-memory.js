import { randomUUID } from "crypto"

export class DatabaseMemory {
    #videos = new Map()

    //set (tipo um array sem duplicados)
    //key, value

    //map (tipo um objeto)

    //randomUUID (cria um id único aleatório)
    //entries (mostra o id)

    list(search) {
        return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data
            }
        })
        .filter(video => {
            if (search) {
                return video.title.includes(search)
            }
            return true
        })
    }

    create(video) {
        const videoId = randomUUID()
                      //map  //set
        this.#videos.set(videoId, video)
    }
    update(id, video) {
        this.#videos.set(id, video)
    }
    delete(id) {
        this.#videos.delete(id)
    }
}