import { makeStyles } from '@material-ui/core/styles';

export const useStyleAccount = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
        padding: theme.spacing(2),
    },
    content: {
        width: '75%',
        padding: theme.spacing(2),
    },
    userInfoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(2),
    },
    avatar: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    userInfo: {
        marginLeft: theme.spacing(4),
        paddingTop: theme.spacing(1),
    },
}));