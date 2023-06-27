import { makeStyles } from '@material-ui/core/styles';

export const useStyleProfileSidebar = makeStyles((theme) => ({
    sidebar: {
        width: '25%',
        backgroundColor: theme.palette.background.default,
        paddingRight: theme.spacing(2),
    },
    sidebarContent: {
        paddingTop: theme.spacing(2),
    },
    contactInformation: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
}));