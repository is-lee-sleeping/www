import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import yellow from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: yellow,
    background: {
      default: '#CFD8DC',
    },
  },
});

export default theme;
