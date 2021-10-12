import * as React from 'react';
import { Loader } from '@mantine/core';
import Styles from '../assets/styles/Global';

const Loading = () => {
    return (
        <div style={Styles.loading}>
          <Loader size='xl' style={{position: 'relative'}}/>
        </div>
      );
}


export default Loading