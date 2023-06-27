import { makeStyles } from '@material-ui/core/styles';

export const useStyleCart = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    productContainer: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    productImage: {
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        marginRight: theme.spacing(2),
    },
    productInfoContainer: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
    },
    productName: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    productPrice: {
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing(1),
    },
    productQuantityContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    quantityButton: {
        minWidth: '30px',
        padding: '0',
        marginRight: theme.spacing(1),
    },
    quantityText: {
        margin: '0 10px',
    },
    productSubtotal: {
        marginBottom: theme.spacing(1),
    },
    checkoutButton: {
        marginLeft: 'auto',
    },
    totalContainer: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));