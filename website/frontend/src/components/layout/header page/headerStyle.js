import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyleHeader = makeStyles((theme) => ({
    appBar: {
        backgroundColor: fade(theme.palette.common.white, 0.9),
        color: theme.palette.text.primary,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolbar1: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.palette.common.grey,
    },
    logo: {
        marginRight: theme.spacing(2),
    },
    search: {
        flexGrow: 0.4,
        marginRight: theme.spacing(-3),
        backgroundColor: fade(theme.palette.common.black, 0.1),
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.2),
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
    },
    inputRoot: {
        width: '100%',
    },
    inputInput: {
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        width: '100%',
    },
    hamburgerIcon: {
        marginRight: theme.spacing(2),
    },
    navigationLinks: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            marginRight: theme.spacing(2),
        },
    },
    sidebar: {
        width: 250,
    },
    sidebarHeading: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
    sidebarLink: {
        '& > *': {
            marginRight: theme.spacing(1),
        },
    },
    userBox: {
        position: 'absolute',
        top: '250%',
        right: '16px',
        transform: 'translateY(-50%)',
        width: '800px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[2],
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        zIndex: 1,
      }, 
      link: {
        color: 'inherit', // Use the same color as the parent element
        textDecoration: 'none', // Remove the default underline
      },           
}));