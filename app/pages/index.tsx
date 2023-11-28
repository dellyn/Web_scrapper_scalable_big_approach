import React, { ReactEventHandler, useState } from 'react';
import { Table } from '#modules/rss/components/Table';
import { Button } from '#company/buttons/Button';
import { Input } from '#company/inputs/Input';

const workingFeeds = ['https://fox2now.com/feed', 'https://stopmotionmagazine.com/feed/', 'https://humanisticsystems.com/feed/', 'https://stackoverflow.com/feeds/tag?tagnames=css&sort=newest', 'https://www.motorcyclecruiser.com/rss.xml', 'https://www.savagechickens.com/feed', 'https://www.britishorienteering.org.uk/newsrss.php'];
const notWorkingFeeds = ['https://news.google.com/rss/search?hl=en-US&gl=US&q=malware&um=1&ie=UTF-8&ceid=US:en', 'https://www.anglicannews.org/home/rss.aspx', 'https://ladyleeshome.com/feed/'];
const investigateFeeds = ['https://www.thepespecialist.com/feed/'];

const HomePage: React.FC = () => {
  const [value, setValue] = useState(workingFeeds[0]);
  const [status, setStatus] = useState({
    loading: false, error: null, articles: [], query: '',
  });

  const fetchArticles = async (e) => {
    e.preventDefault();
    console.log('fetch', value);

    try {
      setStatus({
        loading: true, error: null, articles: [], query: value,
      });
      const response = await fetch(`/api/rss?url=${value}`);
      const data = await response.json();
      setStatus({
        ...status, loading: false, error: null, articles: data, query: value,
      });
    } catch (error) {
      setStatus({
        ...status, loading: false, error, query: value, articles: [],
      });
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(1, e.target.value);

    setValue(e.target.value);
  }
  console.log({ status });

  return (
    <div className='home'>
      <Input native={{
        type: 'text',
        value,
        onChange: handleChange,
      }}/>
      <Button native={{
        onClick: fetchArticles,
        disabled: value === status.query && !!status.articles,
      }}>Fetch</Button>
      <Table data={status.articles} loading={status.loading} error={status.error} />
    </div>
  );
};

export default HomePage;
