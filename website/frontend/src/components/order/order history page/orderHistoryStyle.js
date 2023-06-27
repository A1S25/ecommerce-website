import { makeStyles } from '@material-ui/core/styles';

export const useStyleOrderHistory = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    orderId: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    orderInfo: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    addressContainer: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
    productContainer: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.common.white,
    },
    productImage: {
        width: '50%',
        height: 'auto',
        maxHeight: '120px',
        objectFit: 'cover',
    },
    summaryContainer: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    link: {
        color: 'inherit', // Use the same color as the parent element
        textDecoration: 'none', // Remove the default underline
    },
    commentForm: {
        marginTop: theme.spacing(2),
    },
}));