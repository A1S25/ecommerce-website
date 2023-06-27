import { makeStyles } from '@material-ui/core/styles';

export const useStyleOrderSuccess = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    icon: {
        fontSize: 80,
        color: '#1abc9c',
        marginBottom: theme.spacing(2),
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: '#1abc9c',
        fontSize: 18,
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
        '&:hover': {
            color: '#16a085',
        },
    },
}));