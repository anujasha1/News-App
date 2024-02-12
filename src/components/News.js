import { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }

    capitalizeFirstLetter = (string) => {
return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`
    }

    async componentDidMount() {
        this.updateNews();
    }

    async updateNews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
        &page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.props.setProgress(30)
        let data = await fetch(url).then((res) => res.json())
        this.props.setProgress(70)
        this.setState({
            articles: data.articles,
            totalResults: data.totalResults,
        })
        this.props.setProgress(100)
    }

    fetchMore = async () => {
        this.setState({
            page: this.state.page +1 
        })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
        &page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url).then((res) => res.json())
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalResults: data.totalResults,
        })    }


    render() {
        return (
            <div>
                <h1 className="text-center">News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <InfiniteScroll hasMore={this.state.articles.length !== this.state.totalResults} next={this.fetchMore} 
                dataLength={this.state.articles.length} loader={<Spinner/>}>
                    <div className="container">
                <div className="row">
                    {this.state.articles.length > 1 ? this.state.articles.map((element, index) => {
                        return <div key={index} className="col-md-4">
                            <NewsItem title={element.title} description={element.description}
                                imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                                source={element.source.name} />
                        </div>
                    }) : "No news" }
                </div>
                </div>
                </InfiniteScroll>
            </div>
        )
    }
}

