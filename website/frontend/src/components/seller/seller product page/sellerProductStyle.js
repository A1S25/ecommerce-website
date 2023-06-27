import { makeStyles } from '@material-ui/core/styles';

export const useStyleSellerProduct = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      heading: {
        marginBottom: theme.spacing(2),
      },
      container: {
        backgroundColor: '#f5f5f5',
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      searchBar: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
        justifyContent: 'space-between',
      },
      searchIcon: {
        marginRight: theme.spacing(1),
      },
      selectButton: {
        marginLeft: theme.spacing(1),
      },
      addButton: {
        marginLeft: 'auto',
      },
      dataGrid: {
        marginTop: theme.spacing(2), // Adjust the margin as needed
      },
}));