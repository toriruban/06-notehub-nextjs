// loading.tsx
import css from './notes/NotesClient.module.css';
import {PropagateLoader } from 'react-spinners'

const Loading = () => (
  <div className={css.loaderWrapper}>
    <p className={css.text}>Loading, please wait...</p>
    <PropagateLoader color="blue" size={35} />     
    
  </div>
);

export default Loading;
