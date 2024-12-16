import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
      mode: 'light',
      background: {
          // is generally used for the default background color of the application or the main content areas
          default: '#f0f5f3',
          // is used for surfaces that are meant to stand out from the default background, such as cards, dialogs, and paper elements
          paper: '#ffffff',
      },
      primary: {
          main: '#40AD94',
          light: '#72d5be',
          dark: '#00785e',
          contrastText: '#ffffff',
      },
      secondary: {
          main: '#7F968E',
          light: '#aabeb8',
          dark: '#50655f',
          contrastText: '#ffffff',
      },
      error: {
          main: '#FF5449',
          light: '#ff867a',
          dark: '#c41e17',
          contrastText: '#ffffff',
      },
      warning: {
          main: '#ff9800',
          light: '#ffc947',
          dark: '#c66900',
          contrastText: '#000000',
      },
      info: {
          main: '#2196f3',
          light: '#6ec6ff',
          dark: '#0069c0',
          contrastText: '#ffffff',
      },
      success: {
          main: '#4caf50',
          light: '#80e27e',
          dark: '#087f23',
          contrastText: '#ffffff',
      },
      text: {
          primary: '#1b1b1b',
          secondary: '#525252',
          disabled: '#9e9e9e',          
      },
      divider: '#cfd8dc',
  },
});

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
      background: {
          // is generally used for the default background color of the application or the main content areas
          default: '#303030',
          //is used for surfaces that are meant to stand out from the default background, such as cards, dialogs, and paper elements
          paper: '#424242',
      },
      primary: {
          main: '#90caf9',
          light: '#b3e5fc',
          dark: '#42a5f5',
          contrastText: '#000',
        },
        secondary: {
          main: '#f48fb1',
          light: '#f6c1c0',
          dark: '#d81b60',
          contrastText: '#000',
        },
        error: {
          main: '#f44336',
          light: '#e57373',
          dark: '#d32f2f',
          contrastText: '#fff',
        },
        warning: {
          main: '#ff9800', 
          light: '#ffb74d',
          dark: '#f57c00',
          contrastText: '#000',
        },
        info: {
          main: '#64b5f6', 
          light: '#90caf9',
          dark: '#42a5f5',
          contrastText: '#000',
        },
        success: {
          main: '#66bb6a', 
          light: '#81c784',
          dark: '#388e3c',
          contrastText: '#fff',
        },          
        text: {
          primary: '#ffffff',
          secondary: '#b0bec5',
          disabled: '#757575',
        },
        divider: '#616161', 
  },
});

export { lightTheme, darkTheme };
