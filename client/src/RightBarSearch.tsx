import * as React from 'react';
import { ClientSearchResult } from './client-types';

const SEARCH_TOPICS: ClientSearchResult[] = [
  'Pet Adoption',
  'Fake Slack',
  'Fake Twitter',
  'Fake Online Bank',
];

export interface RightBarSearchProps {
  render: (result: ClientSearchResult) => React.ReactNode;
}

const RightBarSearch: React.FC<RightBarSearchProps> = ({ render }) => {
  const [results, setResults] = React.useState([] as ClientSearchResult[]);

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
