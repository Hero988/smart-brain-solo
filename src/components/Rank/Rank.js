import React from 'react';

// created a ImageLinkForm pure function
// Pass two props you need into the Rank component then display the message: "${name} , your current rank is...${entries}" :
const Rank =  ({ name, entries }) => {
     return (
          <div>
            <div className='white f3 b'>
              {`hello, your current entry count is...`}
            </div>
            <div className='white f1 b'>
            {entries}
            </div>
          </div>
     )
}

export default Rank;