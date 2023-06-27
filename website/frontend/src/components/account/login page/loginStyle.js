import { makeStyles } from '@material-ui/core/styles';

export const useStyleLogin = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(3),
    },
    root: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 10,
        height: 40,
        width: 350,
        '& fieldset': {
          borderWidth: 1,
        },
      },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
    submit: {
      margin: theme.spacing(3, 0, 2),
      marginTop: '8px', 
      borderRadius: '20px',
      marginBottom: '8px',
      '&:hover': { 
        backgroundColor: 'yellow',
      }, 
    },
    button: {
      backgroundImage: 'url("https://source.unsplash.com/random")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      color: 'yellow',
      margin:'10px',
      height: '130px',
      borderRadius: 4,
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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


// button: {
//  backgroundImage: 'url("https://source.unsplash.com/random")',
//  backgroundRepeat: 'no-repeat',
//  backgroundSize: 'cover',
//  color: 'yellow',
//  margin:'10px',
//  height: '130px',
//  borderRadius: 4,
//  '&:hover': {
//    backgroundColor: 'rgba(0, 0, 0, 0.5)',
//  },
//},