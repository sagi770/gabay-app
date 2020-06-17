import React, { forwardRef, useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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

const useStyles = makeStyles(theme => ({
  h2: {
    marginBottom: '10px'
  }
}));

export default function OrdersTable(props) {
  const { selectedDate } = props;
  const classes = useStyles();

  let history = useHistory();
  const id = getIdFromPathname(history.location.pathname);

  const [customer, setCustomer] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);

  const [state, setState] = useState({
    columns: [
      {
        title: 'מוצר',
        field: 'foo',
        render: data => (
          <img
            alt="Product"
            src={`${process.env.REACT_APP_CDN}products/${data.product_id}_200.jpg`}
            style={{ width: 100 }}
          />
        )
      },
      { title: 'מספר הזמנה', field: 'order_id' },
      { title: 'תאריך הזמנה', field: 'timestamp' },
      { title: 'דםשפ המוצר', field: 'product_name' },
      { title: 'SKU', field: 'sku' },
      { title: 'שם על המוצר', field: 'name_on_product' },
      { title: 'מחיר', field: 'price' },
      { title: 'הערות', field: 'comment' }
    ],
    data: [],
    info: {}
  });

  const newDate = new Date(selectedDate);
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  console.log(state.info);
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
    console.log('selectedDate', selectedDate);
    axios
      .get(
        `${process.env.REACT_APP_API_ENDPOINT}customers/exportOrders/${id}/date/${selectedDate}`,
        {
          headers: {
            token: localStorage.token
          }
        }
      )
      .then(res => {
        setIsLoaded(false);

        setState(prevState => {
          const data = res.data.rows;
          const info = res.data.info;
          return { ...prevState, data, info };
        });
      })
      .catch(err => {
        console.error(err);
      });
  }, [selectedDate,id]);

  return isLoaded ? (
    <Loading />
  ) : (
    <Card>
      <Card style={{ textAlign: 'right' }}>
        <h2 className={classes.h2}>שער הדולר: {state.info.nis_currency}</h2>
        <h2 className={classes.h2}> סך הכל בדולרים: {state.info.total_sum}</h2>
        <h2 className={classes.h2}> סך הכל בשקלים: {state.info.total_in_nis}</h2>
      </Card>
      <MaterialTable
        icons={tableIcons}
        title={`${customer.name} orders ${month}/${year}`}
        columns={state.columns}
        data={state.data}
        options={{
          pageSize: 20,
          search: false,
          pageSizeOptions: [20, 50, 100]
        }}
      />
    </Card>
  );
}
