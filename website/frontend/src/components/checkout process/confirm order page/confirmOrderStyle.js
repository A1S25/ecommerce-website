import { makeStyles } from '@material-ui/core/styles';

export const useStyleConfirmOrder = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 600,
    },
    image: {
        width: "100%",
        height: 200,
        objectFit: "cover",
    },
    item: {
        marginBottom: theme.spacing(2),
    },
    subtotal: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    total: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(2),
        padding: theme.spacing(0.5),
        width: theme.spacing(11),
        height: theme.spacing(7),
        backgroundColor: theme.palette.grey[200],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    payButton: {
        marginTop: theme.spacing(2),
        width: theme.spacing(8),
        height: theme.spacing(5),
    },
}));