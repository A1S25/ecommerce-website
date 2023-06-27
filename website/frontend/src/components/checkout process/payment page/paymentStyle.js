import { makeStyles } from '@material-ui/core/styles';

export const useStylePayment = makeStyles((theme) => ({
    paymentForm: {
        maxWidth: 500,
        margin: '0 auto',
        padding: theme.spacing(2),
        background: '#f5f5f5',
        borderRadius: 10,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        marginBottom: theme.spacing(2),
      },
      cardInfoHeading: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
        color: '#333',
      },
      cardElementContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
      },
      cardIcon: {
        marginRight: theme.spacing(1),
        color: '#333',
      },
      cardElement: {
        flex: 1,
        padding: theme.spacing(1),
        borderRadius: 5,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        color: '#333',
        fontSize: 14,
        '&::placeholder': {
          color: '#999',
        },
      },
      paymentFormBtn: {
        marginTop: theme.spacing(2),
        alignSelf: 'flex-end',
        background: '#f44336',
        color: '#fff',
        '&:hover': {
          background: '#d32f2f',
        },
      },
}));