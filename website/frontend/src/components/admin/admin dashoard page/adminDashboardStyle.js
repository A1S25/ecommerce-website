import { makeStyles } from '@material-ui/core/styles';

export const useStyleAdminDashboard = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        marginBottom: theme.spacing(4),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));