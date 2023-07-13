import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Sidebar } from "../Sidebar";
import { Navbar } from "../Navbar";
import "./styles.css";
import notepad from "../../Assets/Images/svgs/notepad.svg";
import { ContentWrapper } from "./ContentWrapper";

export const Dashboard = () => {
  return (
    <ContentWrapper>
      <Grid container>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={3} sx={{ p: 2.2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} lg={3}>
                    <img src={notepad} alt="notepad" />
                  </Grid>
                  <Grid item xs={12} md={4} lg={3} wrap="nowrap">
                    <Typography variant="h2">55</Typography>
                  </Grid>
                  <Grid item xs={12} md={5} lg={6}>
                    <Typography variant="h6">bookings made today</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={3} sx={{ p: 2.2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} lg={3}>
                    <img src={notepad} alt="notepad" />
                  </Grid>
                  <Grid item xs={12} md={4} lg={3} wrap="nowrap">
                    <Typography variant="h2">55</Typography>
                  </Grid>
                  <Grid item xs={12} md={5} lg={6}>
                    <Typography variant="h6">bookings for today</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Paper elevation={3} sx={{ p: 2.2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} lg={3}>
                    <img src={notepad} alt="notepad" />
                  </Grid>
                  <Grid item xs={12} md={4} lg={3} wrap="nowrap">
                    <Typography variant="h2">55</Typography>
                  </Grid>
                  <Grid item xs={12} md={5} lg={6} wrap="nowrap">
                    <Typography variant="h6">total bookings made</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Latest Bookings
                  </Typography>

                  <Box>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Small Conference Room
                    </Typography>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Date: 04-07-2023
                    </Typography>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Dominic Toretto
                    </Typography>
                    <Divider />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Reservations
                  </Typography>

                  <Box>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Small Conference Room
                    </Typography>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Date: 04-07-2023
                    </Typography>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Dominic Toretto
                    </Typography>
                    <Divider />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Quick Links
                  </Typography>

                  <Box>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Small Conference Room
                    </Typography>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Date: 04-07-2023
                    </Typography>
                    <Typography component={"p"} sx={{ mb: 1 }}>
                      Dominic Toretto
                    </Typography>
                    <Divider />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ContentWrapper>
  );
};
