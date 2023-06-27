import { makeStyles } from '@material-ui/core/styles';

export const useStyleProductReviews = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[4],
      },
      title: {
        marginBottom: theme.spacing(3),
        textAlign: 'center',
      },
      form: {
        marginBottom: theme.spacing(3),
      },
      input: {
        width: 200,
      },
      noReviews: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
      },
      greenColor: {
        color: '#4caf50',
      },
      redColor: {
        color: '#f44336',
      },
}));