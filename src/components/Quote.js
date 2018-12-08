import React, {Component} from 'react'
import './Main/Main.css'
import axios from 'axios'

class Quote extends Component {
    constructor() {
        super()
        this.state= {
            quote:"",
            author:""

        }
    }

    componentDidMount(){
        axios.get('http://quotes.rest/qod.json?category=inspire').then(results => {
            this.setState({quote: results.data.contents.quotes[0].quote, author: results.data.contents.quotes[0].author})
    
        })
    }

    render(){
        let { quote, author } = this.state
        return(
            <div>
                <div>{quote}</div>
                <div>{author}</div>
            </div>
        )
    }


}
export default Quote

