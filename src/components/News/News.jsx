import React from 'react';
import "./News.css";
import moment from 'moment';

function News({ name, description, loading, url, image, provider, datePublished }) {

  if (loading) {
    return <h2>Loading...</h2>
  }

  const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

  return (
      <div className="col-6 col-sm-4">
          <div className="card border-secondary mb-3" style={{ maxwidth: + '20rem' }}>
            <a href={url}>Link to news article</a>
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              <img src={image?.thumbnail?.contentUrl || demoImage}
                alt='news' className='img-fluid' />
              <p className="card-text">
                {description > 100
                  ? `${description.substring(0, 100)}...`
                  : <p><small>{description}</small></p>
                }
              </p>
              <div className='container'>
                <img src={provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                <h6>{provider[0]?.name}</h6>
                <p><small className="text-muted">{moment(datePublished).startOf("ss").fromNow()}</small></p>
              </div>
            </div>
          </div>
        </div>
  )
}

export default News;
