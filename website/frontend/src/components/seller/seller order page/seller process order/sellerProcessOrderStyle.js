import { makeStyles } from '@material-ui/core/styles';

export const useStyleSellerProcessOrder = makeStyles((theme) => ({
    root: {
        margin: 'auto',
        maxWidth: '600px',
        padding: theme.spacing(2),
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
      },
      infoContainer: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
      },
      label: {
        fontWeight: 'bold',
        marginRight: theme.spacing(1),
        minWidth: '120px',
      },
      value: {
        marginLeft: theme.spacing(1),
      },
      formContainer: {
        marginTop: theme.spacing(1),
        textAlign: 'center',
      },
      select: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
        borderRadius: '4px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
      },
      submitButton: {
        marginTop: theme.spacing(1),
      },
}));