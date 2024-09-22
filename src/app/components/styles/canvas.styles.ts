import { makeStyles } from '@mui/styles';

export const canvasStyles = makeStyles(() => {
  return {
    toolButton: {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'column',
      gap: '5px',
      alignItems: 'center',
      padding: '5px',
      backgroundColor: 'black',
      borderRadius: '5px',
    },
    toolsContainer: {
      backgroundColor: 'gold',
      display: 'flex',
      flexFlow: 'row',
      gap: '5px',
      padding: '5px',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
    },
    colorContainer: {
      display: 'flex',
      flexFlow: 'column',
      gap: '5px',
      alignItems: 'center',
      background: 'black',
      padding: '5px',
      border: '1px solid white',
      borderRadius: '5px',
    },
  };
});
