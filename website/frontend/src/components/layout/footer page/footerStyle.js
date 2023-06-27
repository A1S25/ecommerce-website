import { makeStyles } from '@material-ui/core/styles';

export const useStyleFooter = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#E6F2F8',
        padding: theme.spacing(2),
        marginTop: 'auto',
    },
    brandName: {
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
        textAlign: 'center',
    },
    logoImage: {
        backgroundColor: 'transparent',
        border: 'none',
    },
    aboutBrand: {
        marginBottom: theme.spacing(1),
        color: '#333333',
        paddingLeft: theme.spacing(1),
    },
    paymentIcons: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        marginLeft: `-${theme.spacing(1)}px`,
    },
    paymentIcon: {
        marginRight: theme.spacing(1),
        color: '#333333',
        fontSize: 20,
    },
    shopMenu: {
        marginBottom: theme.spacing(1),
    },
    companyLinks: {
        marginBottom: theme.spacing(1),
    },
    serviceLinks: {
        marginBottom: theme.spacing(1),
    },
    supportLinks: {
        marginBottom: theme.spacing(1),
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
        '&:hover': {
            color: '#222222',
        },
    },
}));