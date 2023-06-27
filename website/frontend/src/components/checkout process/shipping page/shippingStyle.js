import { makeStyles } from '@material-ui/core/styles';

export const useStyleShipping = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', // Adjust the height as needed
  },
  contentContainer: {
    width: '100%',
    maxWidth: '400px', // Adjust the width as needed
  },
  heading: {
    textAlign: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  textfield1: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      height: 40,
      width: 190,
      '& fieldset': {
        borderWidth: 1,
      },
    },
  },
  textfield4: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      height: 40,
      width: 400,
      '& fieldset': {
        borderWidth: 1,
      },
    },
  },
}));