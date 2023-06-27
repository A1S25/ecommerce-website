import { makeStyles } from '@material-ui/core/styles';

export const useStyleProductDetail = makeStyles((theme) => ({
    carousel: {
        float: 'left',
        padding: theme.spacing(3),
    },
    productName: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    productId: {
        fontSize: '1.2rem',
        marginBottom: theme.spacing(1),
        color: '#777',
    },
    rating: {
        marginBottom: theme.spacing(1),
    },
    numOfReviews: {
        color: '#777',
    },
    price: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    quantityButton: {
        backgroundColor: '#ccc',
        color: '#fff',
        padding: theme.spacing(1),
        marginRight: theme.spacing(1),
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        borderRadius: '4px',
        fontSize: '1.2rem',
    },
    section3: {
        marginTop: theme.spacing(4),
    },
    quantityText: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(0.8),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(0.5),
    },
    addToCartButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: theme.spacing(0.5),
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        borderRadius: '4px',
        fontSize: '0.8rem',
        marginTop: theme.spacing(1.5),
        marginRight: theme.spacing(6),
    },
    status: {
        fontSize: '0.7rem',
        color: '#777',
    },
    buyNowButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: theme.spacing(0.5),
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        borderRadius: '4px',
        fontSize: '0.8rem',
        marginTop: theme.spacing(-1),
        marginRight: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#0056b3',
        },
    },
    description: {
        fontSize: '1.2rem',
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    addToWishlistButton: {
        backgroundColor: '#dc3545',
        color: '#fff',
        padding: theme.spacing(0.5),
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        borderRadius: '4px',
        fontSize: '0.8rem',
        marginTop: theme.spacing(2.5),
    },
    container: {
        marginBottom: theme.spacing(3),
    },
    textContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cardContainer: {
        marginBottom: theme.spacing(3),
        width: '100%',
    },
    productCardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: theme.spacing(-1),
        '& > *': {
            flex: '0 0 calc(25% - 16px)',
            maxWidth: 'calc(25% - 16px)',
            margin: theme.spacing(1),
            boxSizing: 'border-box',
        },
        [theme.breakpoints.down('sm')]: {
            '& > *': {
                flex: '0 0 calc(33.33% - 16px)',
                maxWidth: 'calc(33.33% - 16px)',
            },
        },
        [theme.breakpoints.down('xs')]: {
            '& > *': {
                flex: '0 0 calc(50% - 16px)',
                maxWidth: 'calc(50% - 16px)',
            },
        },
    },
}));