import { makeStyles } from '@material-ui/core/styles';

export const useStyleRegistration = makeStyles((theme) => ({
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
    textfield: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 10,
        height: 40,
        width: 350,
        '& fieldset': {
          borderWidth: 1,
        },
      },
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
    textfield2: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 10,
        height: 40,
        width: 120,
        '& fieldset': {
          borderWidth: 1,
        },
      },
    },
    textfield3: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 10,
        height: 40,
        width: 270,
        margin: 0,
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
    button: {
      backgroundColor: 'grey',
    borderRadius: '20px',
    '&:hover': {
      backgroundColor: 'yellow',
    },
    },
}));