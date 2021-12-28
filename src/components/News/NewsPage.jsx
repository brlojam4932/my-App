import React, { useState, useEffect } from 'react';
import News from './News';
import useFetch from "../Utility/useFetch";
import styled from 'styled-components';
import coinGecko from '../Utility/coinGecko';

const StyledHeaderNews = styled.header`  
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
`;


function NewsPage() {
  //-------news----------------
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [coinListData, setCoinListData] = useState([]);

  const searchCrypto = newsCategory;
  const options = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news/search',
    params: {
      q: searchCrypto,
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

  async function getCoinList() {
    try {
      const res = await coinGecko.get('coins');
      //console.log("response:", res);
      setCoinListData(res.data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getCoinList();
    return () => {
      console.log("cleanup")
    }
  }, []) // component did mount

  const filterOption = coinListData.filter((option) => {
    return option.name === coinListData;
  });


  useEffect(() => {
    console.log("filter: ", filterOption);
  }, [filterOption]);

  console.log("getCoinList: ", coinListData);


  if (loading) return <h4 style={{ color: 'grey' }}>News Loading...</h4>;

  if (error) return <h4 style={{ color: "darkorange" }}>News loading: Error...</h4>


  //------news--end-----------------

  return (
    <div className='container-fluid'>
      <StyledHeaderNews>
        <h2>Crypto News</h2>
        <h5 className="text-primary">News about crypto currencies world-wide.</h5>
      </StyledHeaderNews>
      <br />
      <br />
      <div className='row'>
        {coinListData && (
          <div className="form-group">
            <label for="exampleSelect1" className="form-label mt-4"><h2>Select a Crypto</h2></label>
            <select
              className="form-select" style={{ width: "50%" }}
              id="exampleSelect1"
              ofilterOption
              value={newsCategory}
              onChange={(e) => setNewsCategory(e.target.value)}
            >
              {coinListData.map((currency) => <option value={currency.name}>{currency.name}</option>)}
            </select>

          </div>
        )}
        {getNews && getNews.value.map((news, index) => {
          return (
            <News key={index}
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
