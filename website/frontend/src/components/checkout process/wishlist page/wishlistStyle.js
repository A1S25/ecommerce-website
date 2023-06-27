import { makeStyles } from '@material-ui/core/styles';

export const useStyleWishlist = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    productContainer: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        width: '150px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    productImage: {
        width: '120px',
        height: '120px',
        objectFit: 'cover',
        marginBottom: theme.spacing(2),
    },
    productName: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
        textAlign: 'center',
    },
    productPrice: {
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing(1),
    },
    removeButton: {
        width: '100%',
    },
    ratingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    ratingText: {
        marginLeft: theme.spacing(1),
    },
    totalRating: {
        marginTop: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
}));