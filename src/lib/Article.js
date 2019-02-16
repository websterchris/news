export default class Article {

    constructor(title, body, id){
        this.title = title
        this.body = body
        this.rank = 0
        this.id = id
    }

    getId = () => this.id

    getTitle = () => this.title

    setTitle = title => this.title = title

    getBody = () => this.body

    getRank = () => this.rank

    setRank = rank => {
        const valid_ranks = [-1, 0, 1]
        if(valid_ranks.indexOf(rank) === -1){
            this.rank = 0
            console.error(rank + " is an invalid rank it must be one of " +  JSON.stringify(valid_ranks))
            return
        }
        this.rank = rank
    }

}