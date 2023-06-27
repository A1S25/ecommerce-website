import { makeStyles } from '@material-ui/core/styles';

export const useStyleHome = makeStyles((theme) => ({
    carouselContainer: {
        marginBottom: theme.spacing(3),
    },
    carouselImage: {
        width: '100%',
        borderRadius: theme.spacing(1),
        height: '200px',
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

    //here code is about card image
    leftContainer: {
        backgroundColor: '#F7F7F7',
        padding: theme.spacing(3),
    },
    cardContainer1: {
        display: 'flex',
        gap: theme.spacing(2),
        marginTop: theme.spacing(2),
        justifyItems: 'center', // Add this line
    },
    categoryCard1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '250px',
        width: '200px',
        borderRadius: theme.spacing(2),
        overflow: 'hidden',
    },
    categoryImage: {
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    },
    categoryName: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        color: theme.palette.common.white,
        fontWeight: 'bold',
        color: 'red',
    },
    buttonGroup: {
        display: 'flex',
        gap: theme.spacing(2),
        marginTop: theme.spacing(2),
        justifyContent: 'center',
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '200px',
        height: '80px',
        padding: '16px',
        backgroundColor: '#f0f0f0',
        color: '#000000',
        '&:hover': { backgroundColor: '#c0c0c0', },
        marginTop: theme.spacing(2),
    },
    logo: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(3),
    },
    heading1: {
        fontWeight: 'bold',
        fontSize: '1rem',
        lineHeight: 1,
        marginBottom: theme.spacing(0.5),
    },
    heading2: {
        fontSize: '0.875rem',
        lineHeight: 1,
    },
    branddiv: {
        padding: `${theme.spacing(2)}px 0`,
    },
    image: {
        width: '100vw',
        height: '300px',
        marginBottom: theme.spacing(2),
      },      
}));