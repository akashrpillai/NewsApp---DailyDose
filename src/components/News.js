import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    let [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    

    const updateNews = async () => {
        // console.log("cdm");
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}
        `
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(50);
        // console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${props.category} HeadLines - DailyDose`
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchMoreData = async () => {
        // console.log(page)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize} `
        setPage(page + 1) 
        setLoading(true)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)

    };




    return (
        <>
            <h1 className='text-center' style={{ marginTop: "90px", marginBottom: '30px' }}>DailyDose- Todays Top headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll dataLength={articles.length} //This is important field to render the next data
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}

            >

                <div className="container">
                    <div className="row">
                        {/* {!loading && articles.map((element) => {}before adding infinite scrolling */}
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/photos/abstract-digital-news-concept-picture-id1290904409?b=1&k=20&m=1290904409&s=170667a&w=0&h=6khncht98kwYG-l7bdeWfBNs_GGcG1pDqzLb6ZXhh7I="}
                                    newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                {/* {console.log(element.title)} */}
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>


        </>
    )

}
News.defaultProps = {
    country: "in",
    pagesize: 6,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}
export default News