import { makeStyles } from '@material-ui/core/styles';

export const useStyleSellerDashboard = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(3),
    },
    sidebarContainer: {
        width: 240,
        height: '100vh',
        position: 'fixed',
        zIndex: 1,
        top: 0,
        left: 0,
    },
    card: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.common.white,
        marginBottom: theme.spacing(2),
        width: 270,
        height: 80,
    },
    cardContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    analyticsContainer: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
        width: 600,
    },
    analyticsTitle: {
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(29),
    },
    chartContainer: {
        height: 400,
    },
    buttonContainer: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
    },
}));