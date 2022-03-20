import { SearchResult } from '@full-stack-ts/shared';
import * as React from 'react';


const SEARCH_TOPICS: SearchResult[] = [
  'YouTube Gaming',
  'Youtube Music',
  'Youtube News',
  'Youtube Movies',
  {
    name: 'YouTube Gaming',
    handle: 'youtube_gaming',
    avatarUrl: 'http://placecorgi.com/140/140',
  },
  {
    name: 'YouTube Creators',
    handle: 'YTCreators',
    avatarUrl: 'http://placecorgi.com/170/170',
  },
  {
    name: 'YouTube TV',
    handle: 'youtubetv',
    avatarUrl: 'http://placecorgi.com/181/181',
  },
];

export interface RightBarSearchProps {
  render: (result: SearchResult) => React.ReactNode;
}

const RightBarSearch: React.FC<RightBarSearchProps> = ({ render }) => {
  const [results, setResults] = React.useState([] as SearchResult[]);

  let timer: ReturnType<typeof setTimeout>;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const fragment = target.value.toLowerCase();
      if (fragment === '') {
        setResults([]);
        return;
      }
      setResults(
        SEARCH_TOPICS.filter((r) => {
          if (typeof r === 'string') {
            return r.toLowerCase().includes(fragment);
          } else {
            return (
              r.handle.toLowerCase().includes(fragment) ||
              r.name.toLowerCase().includes(fragment)
            );
          }
        })
      );
    }, 10);
  };

  return (
    <div className="search-container">
      <div className="search-input">
        <input
          id="search"
          type="text"
          placeholder="Search Twitter"
          autoComplete="off"
          onInput={handleInput}
        />
        <i className="fas fa-search"></i>
      </div>
      <div
        className={
          results.length > 0 ? 'search-results open' : 'search-results'
        }
      >
        {results.map((result) => render(result))}
        <hr />
        <div className="result">
          <p>Go to @handle</p>
        </div>
      </div>
    </div>
  );
};

export default RightBarSearch;
