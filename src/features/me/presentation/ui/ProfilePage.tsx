import { Box, Typography, Container, Card, CardContent, Grid, Avatar, Chip, Stack } from "@mui/material";
import { useMeStore } from "..";
import { useEffect } from "react";

import BusinessIcon from '@mui/icons-material/Business';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';


const ProfilePage = () => {
    const data = useMeStore((state) => state.me);
    const getMe = useMeStore.use.getMe();

    useEffect(() => {
        async function fetchMe() {
            getMe();
        }

        fetchMe();
    },[])


    return (
        <Box
            component={"main"}
            sx={{

            }}>
                <Typography variant="h3">Profile</Typography>

                <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Card>
        <CardContent>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Avatar
              alt={data?.name}
              sx={{ width: 80, height: 80, fontSize: '2rem', bgcolor: 'primary.main' }}
            >
              {data?.name[0]}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {data?.name}
            </Typography>
           
          </Stack>

          <Grid container spacing={2} style={{ marginTop: '1rem' }}>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <EmailIcon color="action" />
                <Typography variant="body1">{data?.email}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon color="action" />
                <Typography variant="body1">
                  {data?.phoneNumber || 'No phone number provided'}
                </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <BusinessIcon color="action" />
                <Typography variant="body1">{data?.company.name}</Typography>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Time Zone: {data?.company.timeZone}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Roles:
              </Typography>
              <Stack direction="row" spacing={1}>
                {data?.role.map((role) => (
                  <Chip key={role.id} label={role.name} color="primary" />
                ))}
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
            
        </Box>
    );
};

export default ProfilePage;