import React from 'react';
import "./News.css";
import moment from 'moment';

function News({ name, description, loading, url, image, provider, datePublished }) {

  if (loading) {
    return <h2>Loading...</h2>
  }

  const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

  return (
    <div className='news-container'>
      <div className='row row-cols-12'>
        <div className='col-sm-4'>
          <img src={image?.thumbnail?.contentUrl || demoImage}
            alt='news' className='img-fluid' />
          <h4>{name}</h4>

          {description > 20
            ? `${description.substring(0, 100)}...`
            : <p><small>{description}</small></p>
          }
          <a href={url}>Link to news article</a>

          <div className='container'>
            <img src={provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
            <h4>{provider[0]?.name}</h4>
            <p><small className="text-muted">{moment(datePublished).startOf("ss").fromNow()}</small></p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default News;
