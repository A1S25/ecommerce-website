import { makeStyles } from '@material-ui/core/styles';

export const useStyleUpdateUser = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[3],
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  formField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  textfield4: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 10,
      height: 40,
      width: 400,
      '& fieldset': {
        borderWidth: 1,
      },
      marginRight: theme.spacing(2),
    },
  },
  button: {
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: 'yellow',
    },
    margin: theme.spacing(2),
    width: 100,
  },
  typography1: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
}));