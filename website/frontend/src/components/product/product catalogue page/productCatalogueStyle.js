import { makeStyles } from '@material-ui/core/styles';

export const useStyleProductCatalogue = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    checkbox: {
        color: theme.palette.primary.main,
    },
}));