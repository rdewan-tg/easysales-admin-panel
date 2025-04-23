import { Box, Card, CardHeader, IconButton, List, Typography } from "@mui/material";
import { useCompanyStore } from "@/features/company/presentation/index";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { AddBusinessOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { routeName } from "@/core/route";



const CompanyListPage = () => {
    const navigate = useNavigate();

    const comapnies = useCompanyStore((state) => state.companies);
    const getCompanies = useCompanyStore.use.getCompanies();

    useEffect(() => {
        async function fetchCompanies() {
            await getCompanies();
        }

        fetchCompanies();
    }, []);


    const navigateToCreateCompany = () => {
        navigate(`/${routeName.dashboard}/${routeName.companies}/${routeName.createCompany}`);
    }

    return (
        <Box
            component={"main"}
            sx={{
                height: "100vh", // Full viewport height
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box", // Ensures padding is included in height/width
                m: 0,
                p: 0,
            }}
        >
            <Typography variant="h3">Companies</Typography>

            <Box
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
            }}>

                <IconButton color="primary" onClick={navigateToCreateCompany} size="large">
                    <AddBusinessOutlined />
                </IconButton>
            </Box>

            <Box
                sx={{
                    height: "100%",
                    overflow: "auto",
                    p: 2,
                }}>

                <Grid>
                    <List
                        dense={true}>
                        {
                            Array.isArray(comapnies) && comapnies.map((company) => {
                                return <Card
                                    key={company.id}
                                    raised
                                    onClick={() => console.log("company", company)}
                                    sx={{ mb: 2, p: 2 }}
                                >
                                    <CardHeader
                                        title={company.name}
                                        subheader={company.email}
                                    />
                                </Card>
                            })
                        }

                    </List>
                </Grid>

            </Box>


        </Box>
    )
}

export default CompanyListPage;