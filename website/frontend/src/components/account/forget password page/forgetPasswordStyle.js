import { makeStyles } from '@material-ui/core/styles';

export const useStyleForgetPassword = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(2),
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
    button: {
      borderRadius: '20px',
      marginTop: '8px',
      '&:hover': {
        backgroundColor: 'yellow',
      },
    },
}));