export default class Article {

    constructor(title, body){
        this.title = title
        this.body = body
        this.rank = 0
    }

    getTitle = () => this.title

    setTitle = title => this.title = title

    getBody = () => this.body

}