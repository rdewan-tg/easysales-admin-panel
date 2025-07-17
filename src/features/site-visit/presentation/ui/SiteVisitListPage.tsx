import { Backdrop, Box, CircularProgress } from "@mui/material";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Sort,
  Filter,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { useSiteVisitStore } from "../index";
import { useEffect, useRef } from "react";
import { NotificationSnackbar } from "@/common/components";

const SiteVisitListPage = () => {
  const gridRef = useRef<GridComponent | null>(null);
  const isLoading = useSiteVisitStore((state) => state.isLoading);
  const error = useSiteVisitStore((state) => state.error);
  const siteVisits = useSiteVisitStore((state) => state.siteVisits);
  const getSiteVisits = useSiteVisitStore.use.getSiteVisits();

  useEffect(() => {
    async function fetchSiteVisits() {
      await getSiteVisits();
    }
    fetchSiteVisits();
  }, []);

  const created = () => {
    (
      document.getElementById(
        (gridRef.current as GridComponent).element.id + "_searchbar"
      ) as HTMLElement
    ).addEventListener("keyup", (event) => {
      (gridRef.current as GridComponent).search(
        (event.target as HTMLInputElement).value
      );
    });
  };

  return (
    <Box
      component={"main"}
      sx={{
        position: "relative",
        height: "100%", // Changed from 100vh to 100%
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        width: "100%",
        m: 0,
        p: 0,
        overflow: "hidden",
        minHeight: 0, // Prevent flex items from expanding beyond container
      }}
    >
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <NotificationSnackbar
        isUpdated={false}
        isDeleted={false}
        updateMessage=""
        deleteMessage=""
        error={error || undefined}
      />

      {/* Site Visits Grid */}
      <Box sx={{ flex: 1, width: "100%", overflow: "auto" }}>
        <GridComponent
          id="siteVisitsGrid"
          dataSource={siteVisits}
          allowPaging={true}
          allowSorting={true}
          created={created}
          pageSettings={{ pageSize: 10 }}
          height="100%"
          toolbar={["Search"]}
          sortSettings={{
            columns: [
              { field: "salesPersonName", direction: "Ascending" },
              { field: "customerName", direction: "Ascending" },
              { field: "id", direction: "Ascending" },
            ],
          }}
          ref={(g: GridComponent | null) => {
            gridRef.current = g;
          }}
        >
          <ColumnsDirective>
            <ColumnDirective
              field="id"
              headerText="ID"
              width="70"
              textAlign="Right"
            />
            <ColumnDirective
              field="salesPersonName"
              headerText="Sales Person"
              width="150"
            />
            <ColumnDirective
              field="customerName"
              headerText="Customer Name"
              width="150"
            />
            <ColumnDirective
              field="customerAddress"
              headerText="Address"
              width="200"
            />
            <ColumnDirective
              field="timeIn"
              headerText="Time In"
              width="150"
              format={{ type: "dateTime", format: "yMd H:mm" }}
            />
            <ColumnDirective
              field="timeOut"
              headerText="Time Out"
              width="150"
              format={{ type: "dateTime", format: "yMd H:mm" }}
            />
            <ColumnDirective
              field="durationInOutlet"
              headerText="Duration (min)"
              width="120"
              textAlign="Right"
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Toolbar]} />
        </GridComponent>
      </Box>
    </Box>
  );
};

export default SiteVisitListPage;
