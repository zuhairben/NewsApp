import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults]= useState(0);
    // document.title = `${this.capitalizeFunction(this.props.category)} - NewsMonkey`;

    const capitalizeFunction = (word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }

    const componentDidMount= async()=> {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eec4466200594be49af453b7f095d88c&page=1&pageSize=${props.pageSize}`;
        // let url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&country=${this.props.country}&apikey=33f260fbc75d16bcb57e67ac8048e591&page=1&pageSize=${this.props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        
    }

    useEffect(() => {
        componentDidMount();
        // eslint-disable-next-line
    }, [])

    const handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eec4466200594be49af453b7f095d88c&page=${page + 1}&pageSize=${props.pageSize}`;
        // let url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&country=${this.props.country}&apikey=33f260fbc75d16bcb57e67ac8048e591&page=${this.props.page+1}&pageSize=${this.props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setPage(page+1)
        setArticles(parsedData.articles)
        setLoading(false)
    }

    const handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eec4466200594be49af453b7f095d88c&page=${page - 1}&pageSize=${props.pageSize}`;
        // let url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&country=${this.props.country}&apikey=33f260fbc75d16bcb57e67ac8048e591&page=${this.props.page-1}&pageSize=${this.props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setPage(page-1)
        setArticles(parsedData.articles)
        setLoading(false)
    }

        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px' }}>NewsMonkey - Top Headlines on {capitalizeFunction(props.category)}</h1>
                {loading && <Spinner />}
                <div>
                    <div className="row my-3">
                        {!loading && articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                    imageUrl={element.urlToImage ? element.urlToImage : "https://media.cnn.com/api/v1/images/stellar/prod/230922160830-01-jellyfish-brain-central-nervous-system-learning.jpg?c=16x9&q=w_800,c_fill"}
                                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    <div className="container d-flex justify-content-between">
                        <button disabled={page <= 1} className="btn btn-primary" type="button" onClick={handlePreviousClick}>&larr; Previous</button>
                        <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-primary" type="button" onClick={handleNextClick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }


News.defaultProps = {
    country: 'us',
    paegSize: 9,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
