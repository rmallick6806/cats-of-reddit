import React from 'react';
import pin from '../../assets/pin.svg';
import activePin from '../../assets/active-pin.svg';
import _ from 'lodash';
import './List.css';

const BASE_URL = 'http://www.reddit.com';

const ListItem = (props) => {
  const data = props.cat;
  const pinned = props.pinned;
  const idx = props.idx;
  const imgClassName = (pinned) ? 'img-container pinned' : 'img-container not-pinned';

  return (
    <div className='list-item'>
      <div className={imgClassName}
        onClick={() => props.itemClick(idx, data)}>
        <img src={(pinned) ? activePin : pin} alt="logo" />
      </div>
      <a href={BASE_URL + data.permalink} target='_blank'>
        {data.title}
      </a>
    </div>
  )
};

const List = (props) => {
  const { cats, savedCats } = props;
  return (
    <div className="list-container">
      {_.map(savedCats, (cat, idx) => {
          return <ListItem
            cat={cat}
            key={idx}
            idx={idx}
            pinned={true}
            itemClick={props.removeSavedCat}
          />
        })
      }
      {_.map(cats, (cat, idx) => {
          return <ListItem
            cat={cat}
            key={idx}
            idx={idx}
            itemClick={props.saveCat}
          />
        })
      }
    </div>
  )
}

export default List;
