// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Loader from '../Components/Loader';
// import { Document , Page} from 'react-pdf' 

// const FileRenderer = () => {
//     const [flag,setFlag] = useState(true)
//     const loc = useLocation()
//     const url = loc.state.url
//      console.log(url);

  
//   return (
//     <div>
//       {!flag?<Loader/>:(
//          <embed src={url} width="100%" height="500px" type="application/pdf" />
//       )}
//     </div>
//   );
// };

// export default FileRenderer;
