import React, { useState } from 'react';
import News from './News';
import useFetch from "../Utility/useFetch";
import styled from 'styled-components';

const StyledHeaderNews = styled.header`  
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`;


function NewsPage() {
  const [searchNews, setSearchNews] = useState('cryptocurrency');
  //-------news----------------
  const newsCatergory = searchNews;

  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
      q: newsCatergory,
      count: '20',
      freshness: 'Week',
      textFormat: 'Raw',
      safeSearch: 'Off'
    },
    headers: {
      'user-agent': 'cryptonews',
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': '9271cb1bffmsh3bfde2fc26f9dd1p125f3cjsn6324533a44df'
    }

  };

  // destructured data - useFetch("https://...any_address")
  // in the case of Pedro's api...
  // <h1>{data?.setup} : {data?.delivery}</h1>
  // change the data variable...
  // <h1>{joke?.setup} : {joke?.delivery}</h1>
  const { data: getNews, loading, error, datePublished } = useFetch(options);

  if (loading) return <h1>Loading...</h1>

  if (error) return <h1>Error...</h1>

  //------news--end-----------------
  return (
    <div className='container'>
      <StyledHeaderNews>
        <h2>Crypto News</h2>
        <h5 className="text-primary">News about crypto currencies world-wide.</h5>
      </StyledHeaderNews>
      <br />
      <div className='row'>
        {getNews && getNews.value.map(news => {
          return (
            <News
              key={news.index}
              name={news.name}
              description={news.description}
              url={news.url}
              image={news.image}
              provider={news.provider}
              datePublished={datePublished}
            />
          )
        })};
      </div>
    </div>
  )
}

export default NewsPage;
