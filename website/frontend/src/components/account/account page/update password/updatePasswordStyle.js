import { makeStyles } from '@material-ui/core/styles';

export const useStyleUpdatePassword = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
        padding: theme.spacing(2),
    },
    content: {
        width: '75%',
        padding: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        marginLeft: theme.spacing(40),
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(2),
    },textfield4: {
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
      width: 300,
    },
    typography1: {
        marginLeft: theme.spacing(31),
        marginBottom: theme.spacing(2),
    },
    typography2: {
        marginLeft: theme.spacing(22.5),
        marginBottom: theme.spacing(3),
    },
}));