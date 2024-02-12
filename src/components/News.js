import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {

    const [articles, setArticles] = useState([])
    const [page,  setpage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - News`
        updateNews()
        //eslint-disable-next-line
    }, [])

    const updateNews = async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
        &page=${page}&pageSize=${props.pageSize}`
        props.setProgress(30)
        let data = await fetch(url).then((res) => res.json())
        props.setProgress(70)
        setArticles(data.articles)
        setTotalResults(data.totalResults)
        props.setProgress(100)
    }

    const fetchMore = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
        &page=${page+1}&pageSize=${props.pageSize}`
        setpage(page + 1)
        let data = await fetch(url).then((res) => res.json())
        setArticles(articles.concat(data.articles))
        setTotalResults(data.totalResults)
    }

    return (
        <div>
            <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>News - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            <InfiniteScroll hasMore={articles.length !== totalResults} next={fetchMore}
                dataLength={articles.length} loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div key={element.url} className="col-md-4">
                                <NewsItem title={element.title} description={element.description}
                                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}

export default News
