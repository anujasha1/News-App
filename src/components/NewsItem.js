import { Component } from "react";

export default class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props
        return (
            <div className="my-3">
                <div className="card">
                    <div style={{display: "flex", justifyContent: 'flex-end', position: "absolute", right: "0"}}>
                <span className="badge
                        rounded-pill bg-danger " style={{left: '90%', zIndex: '1'}}>{source}
                            </span>
</div>                    <img src={!imageUrl ? "https://c.ndtvimg.com/2024-02/70ikadec_baba-siddique-1200_650x400_10_February_24.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown": author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}