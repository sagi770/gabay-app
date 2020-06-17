import React, { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  ShoppingBasket,
  Search,
  ViewColumn
} from '@material-ui/icons';

import Loading from '../../../../../theme/Loading';
import CustomizedSnackbar from '../../../../../helpers/Snackbar';
import { useUtils } from '../../../../../context/utils';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};



export default function MembersTable() {
  const { utils, setUtils } = useUtils();
  let history = useHistory();

  const [isLoaded, setIsLoaded] = useState(true);
  const [SnackbarData, setSnackbarData] = useState({
    type: 'success',
    message: 'success!'
  });
  const [state, setState] = React.useState({
    columns: [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Name', field: 'first_name' },
      { title: 'Email', field: 'email' },
      { title: 'Phone', field: 'phone' }
    ],
    data: []
  });

  useEffect(() => {
    function callAPI() {
      axios
        .get(`${process.env.REACT_APP_API_ENDPOINT}members`, {
          headers: {
            token: localStorage.token
          }
        })
        .then(res => {
          setIsLoaded(false);

          setState(prevState => {
            const data = res.data;
            return { ...prevState, data };
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
    callAPI();
  }, []);

  return isLoaded ? (
    <Loading />
  ) : (
    <div>

      <MaterialTable
        icons={tableIcons}
        title="Member List"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            axios
              .post(
                `${process.env.REACT_APP_API_ENDPOINT}members/add`,
                newData,
                {
                  headers: {
                    token: localStorage.token
                  }
                }
              )
              .then(res => {
                newData.id = res.data.id;
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
                setSnackbarData({
                  message: 'member been Add'
                });
                setUtils({ ...utils, SnackbarStatus: true });
              })
              .catch(err => {
                setSnackbarData({
                  type: 'error',
                  message: err.message
                });
                setUtils({ ...utils, SnackbarStatus: true });
                console.error(err);
              }),
          onRowUpdate: (newData, oldData) =>
            axios
              .put(
                `${process.env.REACT_APP_API_ENDPOINT}members/${newData.id}`,
                newData,
                {
                  headers: {
                    token: localStorage.token
                  }
                }
              )
              .then(res => {
                setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
                setSnackbarData({
                  message: 'member been update!'
                });
                setUtils({ ...utils, SnackbarStatus: true });
              })
              .catch(err => {
                setSnackbarData({
                  type: 'error',
                  message: err.message
                });
                setUtils({ ...utils, SnackbarStatus: true });
                console.error(err);
              }),

          onRowDelete: oldData =>
            axios
              .delete(
                `${process.env.REACT_APP_API_ENDPOINT}members/${oldData.id}`,
                {
                  headers: {
                    token: localStorage.token
                  }
                }
              )
              .then(res => {
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });

                setSnackbarData({
                  message: 'member been deleted'
                });
                setUtils({ ...utils, SnackbarStatus: true });
              })
              .catch(err => {
                setSnackbarData({
                  type: 'error',
                  message: err.message
                });
                setUtils({ ...utils, SnackbarStatus: true });
                console.error(err);
              })
        }}
        actions={[
          {
            icon: ShoppingBasket,
            tooltip: 'Show Orders',
            onClick: (event, rowData) => history.push(`/members/${rowData.id}`)
          }
        ]}
      />
      <CustomizedSnackbar
        type={SnackbarData.type}
        message={SnackbarData.message}
      />
    </div>
  );
}
