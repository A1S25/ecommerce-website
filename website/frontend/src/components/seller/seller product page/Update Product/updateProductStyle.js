import { makeStyles } from '@material-ui/core/styles';

export const useStyleUpdateProduct = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
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
      button: {
        backgroundColor: 'grey',
      borderRadius: '20px',
      '&:hover': {
        backgroundColor: 'yellow',
      },
      }, 
}));