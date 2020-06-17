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
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn
} from '@material-ui/icons';

import Loading from '../../../../../theme/Loading';
import getIdFromPathname from '../../../../../helpers/getIdFromPathname';

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
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
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

export default function OrdersTable() {
  let history = useHistory();
  const id = getIdFromPathname(history.location.pathname);

  const [customer, setCustomer] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);

  const [state, setState] = useState({
    columns: [
      { title: 'Id', field: 'id', editable: 'never' },
      { title: 'Status', field: 'order_status_name', editable: 'never' },
      { title: 'Order Time', field: 'timestamp' },
      { title: 'Comment', field: 'comment' },
      { title: 'Total', field: 'total_sum' }
    ],
    data: []
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}customers/${id}`, {
        headers: {
          token: localStorage.token
        }
      })
      .then(res => {
        setCustomer(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}customers/orders/${id}`, {
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
        console.error(err);
      });
  }, [id]);

  return isLoaded ? (
    <Loading />
  ) : (
    <MaterialTable
      icons={tableIcons}
      title={`${customer.name} orders`}
      columns={state.columns}
      data={state.data}
      options={{
        pageSize: 20,
        pageSizeOptions: [20, 50, 100]
      }}
      actions={[
        {
          icon: Edit,
          tooltip: 'Edit Order',
          onClick: (event, rowData) => history.push(`/order/${rowData.id}`)
        }
      ]}
    />
  );
}
